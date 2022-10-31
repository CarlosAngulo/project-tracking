import { Injectable } from '@angular/core';
import { cardProps } from '../cards/card/card.props';
import { IConstrains, INode, IProject, NodeStatus } from '../interfaces/nodes.inteface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeTreeService {
  private _mvps: Subject<any[]> = new Subject();
  private mvps$: Observable<any[]> = this._mvps.asObservable();
  
  private name!: string;
  private _name: Subject<string> = new Subject();
  private name$: Observable<string> = this._name.asObservable();
  
  private leader!: string;
  private _leader: Subject<string> = new Subject();
  private leader$: Observable<string> = this._leader.asObservable();
  
  private constrains!: IConstrains;
  private _constrains: Subject<IConstrains> = new Subject();
  private constrains$: Observable<IConstrains> = this._constrains.asObservable();

  private  nodeTree: INode[] = [];
  private  _nodeTree: Subject<INode[]> = new Subject();
  private nodeTree$: Observable<INode[]> = this._nodeTree.asObservable();

  public treeProgress!: any[];
  private _treeProgress: Subject<any[]> = new Subject();
  private treeProgress$: Observable<any[]> = this._treeProgress.asObservable();

  private _isLoadWindowOpen: Subject<boolean> = new Subject();
  private isLoadWindowOpen$: Observable<boolean> = this._isLoadWindowOpen.asObservable();

  public isProjectLoaded = false;
  private childrenList: string[] = [];
   
  constructor() {};

  getStaticNodeTree() {
    return this.nodeTree;
  }
  
  getNodeTree():Observable<INode[]> {
    return this.nodeTree$;
  }

  getMVPs(): Observable<any[]> {
    return this.mvps$;
  }

  getProgress(): Observable<any[]> {
    return this.treeProgress$;
  }
  
  getProjectName(): Observable<string> {
    return this.name$;
  }
  
  getLeader(): Observable<string> {
    return this.leader$;
  }

  getConstrains(): Observable<IConstrains> {
    return this.constrains$;
  }

  loadFromLocalStorage() {
    let project: any = localStorage.getItem('project');
    if (project) {
      const parsedProject = JSON.parse(project);
      this.loadProject(parsedProject);
    }
  }
  
  loadProject(project: IProject) {
    localStorage.setItem('project', JSON.stringify(project));
    this._name.next(project.name);
    this.name = project.name;
    this._leader.next(project.leader);
    this.leader = project.leader;
    this.isProjectLoaded = true;
    const parsedProject = this.parseProject(project);
    this.sortDependencies(parsedProject.tickets);
  }

  parseProject(project:IProject):IProject {
    return {
      ...project,
      tickets: project.tickets.map((ticket:INode) => ({
        ...ticket,
        children: [],
        childrenTree: [],
        simpleChildrenTree: [],
        index: 0,
        level: 0,
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
      }))
    }
  }

  // TO DO: Move to NgRx
  openLoadWindow() {
    this._isLoadWindowOpen.next(true);
  }
  
  isLoadWindowOpen(): Observable<boolean> {
    return this.isLoadWindowOpen$;
  }

  private sortDependencies(nodes: INode[]) {
    // Creates the three
    this.childrenList = [];
    let nodeTree = this.nodesTree(nodes);

    // Add children
    nodeTree = this.addChildren(nodeTree);
    // console.log(this.addSimpleChildrenTree(nodeTree))
    
    // Add positions
    nodeTree = this.addPositions(nodeTree);
    
    // Adds parents coords
    nodeTree = this.addParentCoodrs(nodeTree);
    
    // Block child nodes
    nodeTree = this.blockByParents(nodeTree);

    this.nodeTree = nodeTree;

    console.log(this.nodeTree)
    
    this._nodeTree.next(nodeTree);

    this.calculateTreeProgres(this.nodeTree);

    this.extractMVPs(nodes);
  }

  private nodesTree(firstList: INode[], secondList: INode[] = [], level: number = 0 ): INode[] {
    if (firstList.length === 0) {
      return secondList;
    }
    
    let parentNodes = firstList
    .filter( node => node.parents?.length === 0)
    .map((node, index) => ({...node, level, index }));

    if (parentNodes?.length === 0) {
      // creates next level
      secondList.map((parentNode) => {
        parentNodes = parentNodes
        .concat(firstList
          // .filter(node => node.parents?.includes(parentNode.code))
          .filter(node => node.parents[0] === parentNode.code)
          .map(node => ({...node, level, index: 0}))
        )
      });
      // Remove duplicates
      parentNodes = parentNodes
      .filter((node, index, self) =>
        index === self.findIndex((t) => (
          t.code === node.code
        ))
      )
      .map( (parentNode, index) => ({
        ...parentNode,
        index
      }));
    }

    secondList = secondList.concat(parentNodes);
    
    // removes current level from original array
    firstList = firstList
    .filter(
      (node) => !secondList
      .map(nodeLevel => nodeLevel.code)
      .includes(node.code)
    )

    level++;

    return this.nodesTree(firstList, secondList, level);
  }

  private addChildren(nodes: INode[]) {
    let newNodes: INode[] = [...nodes];
    nodes.forEach(node => {
      node.parents?.forEach(parent => {
        const parentIndex = newNodes.findIndex( newNode => newNode.code === parent);
        newNodes[parentIndex].children = newNodes[parentIndex]?.children?.concat(node.code);
        newNodes[parentIndex].childrenTree = [newNodes[parentIndex].children];
      })
    });
    newNodes = newNodes.map(currentNode => ({
      ...currentNode,
      // childrenTree: [nodes.filter(node => node.parents.includes(currentNode.code)).map(node=>node.code)],
      simpleChildrenTree: [nodes.filter(node => node.parents[0] === currentNode.code).map(node=>node.code)]
    }))
    newNodes.forEach(node => {
      this.addChildrenTree(nodes, node);
      this.addSimpleChildrenTree(nodes, node)
    });
    return newNodes;
  }

  private addSimpleChildrenTree(nodes: INode[], node?: INode) : INode | void {
    if (!node) {
      return;
    }
    const nextChildrenLevel = this.addSimpleTreeChildrenNextLevel(nodes, node);
    if (nextChildrenLevel.length === 0) {
      return node;
    }
    node.simpleChildrenTree.push(nextChildrenLevel);
    return this.addSimpleChildrenTree(nodes, node);
  }

  private addSimpleTreeChildrenNextLevel(nodes: INode[], currentNode: INode): string[] {
    if (!currentNode) {
      return [];
    }
    const currentTree = currentNode.simpleChildrenTree[currentNode.simpleChildrenTree.length - 1];
    return nodes.filter( node => currentTree.includes(node.parents[0])).map(node=>node.code)
  }

  private addChildrenTree(nodes: INode[], node?: INode): INode | void {
    if (!node) {
      return;
    }
    const nextChldrenLevel = this.addTreeChildrenNextLevel(nodes, node);
    if (nextChldrenLevel.length === 0) {
      return node;
    }
    node.childrenTree.push(nextChldrenLevel);
    return this.addChildrenTree(nodes, node);
  }

  private addTreeChildrenNextLevel(nodes:INode[], currentNode?: INode): string[] {
    if (!currentNode) {
      return [];
    }
    const currentTree = currentNode.childrenTree[currentNode.childrenTree.length - 1];
    let childrenNextLevel: string[] = []
    if (currentTree) {
      childrenNextLevel = currentTree.map(nodeCode => nodes
        .find( item => item.code === nodeCode)?.childrenTree[0] || []
      )
      .flat()
    }
    return [...new Set(childrenNextLevel)]
  }

  private addPositions(nodes: INode[]): INode[] {
    nodes = nodes.map(currentNode => {
      const previousPositions = nodes
        .filter(node=> node.level === currentNode.level && node.index < currentNode.index)
        .map(node => this.nodeBiggestChildRow(node) * (cardProps.width + cardProps.gap.x))
        .reduce((acc, curr) => acc + curr, 0);
      const centerPosition = this.nodeBiggestChildRow(currentNode) * (cardProps.width + cardProps.gap.x) / 2;
      console.log(currentNode.code, this.nodeBiggestChildRow(currentNode), currentNode.simpleChildrenTree)
      return {
        ...currentNode,
        position: {
          x: previousPositions + centerPosition,
          y: currentNode.level * (cardProps.height + cardProps.gap.y) + cardProps.margin.y
        }
      };
    })

    // Selects the level with max number of nodes
    const maxNodesLevel = nodes
    .reduce((acc:number[], curr:INode) => {
      acc[curr.level] = (acc[curr.level] || 0) + 1;
      return acc;
    }, [])
    .reduce((acc, curr, index) => curr > acc.val ? {index, val: curr} : {...acc}, {index: 0, val: 0})

    // Calculates positions for nodes in levels higher than maxNodesLevel
    nodes.forEach(currentNode => {
      const parent = nodes.find(node => node.code === currentNode.parents[0]);
      const offsetByParent = (parent?.position.x || 0) - (((parent?.simpleChildrenTree[0].length || 0) - 1) * (cardProps.width + cardProps.gap.x) / 2 );
      const indexOnParent = parent?.simpleChildrenTree[0].findIndex(childrenCode => childrenCode === currentNode.code) || 0;
      const offsetBySiblings = (indexOnParent) * (cardProps.width + cardProps.gap.x);
      if (currentNode.level > maxNodesLevel.index ) {
        currentNode.position.x = offsetByParent + offsetBySiblings;
      }
      if (currentNode.level < maxNodesLevel.index ) {
        const child = currentNode.childrenTree[0];
        const posXFirstChildren =  nodes.find(node => node.code === child[0])?.position.x || 0;
        const posXLastChildren =  nodes.find(node => node.code === child[child.length - 1])?.position.x || 0;
        currentNode.position.x = posXLastChildren + ((posXFirstChildren - posXLastChildren ) / 2);
      }
    })

    const constrains = this.calculateConstrains(nodes);
    this._constrains.next(constrains);
    
    return nodes.map(node=> ({
      ...node,
      position: {
        y: node.position.y,
        x: node.position.x - constrains.left + cardProps.margin.x
      } 
    }));
  }

  private nodeBiggestChildRow(node:INode) :number {
    return node.simpleChildrenTree.reduce((acc, curr)=> acc > curr.length ? acc : curr.length, 1)
  }

  private addParentCoodrs(nodes: INode[]) {
    return nodes?.map( node =>({
      ...node,
      paretsPosition: node.parents?.map((parentCode) => {
        const parentCoords = nodes.find(ticket => ticket.code === parentCode)?.position;
        return {
          code: parentCode,
          x: parentCoords?.x || 0,
          y: parentCoords?.y || 0
        }
      })
    }));
  }

  private calculateConstrains(nodes: INode[]) {
    return nodes.reduce((acc, curr) => {
      acc.left = curr.position.x < acc.left ? curr.position.x : acc.left;
      acc.top = curr.position.y < acc.top ? curr.position.y : acc.top;
      acc.right = curr.position.x > acc.right ? curr.position.x : acc.right;
      acc.bottom = curr.position.y > acc.bottom ? curr.position.y : acc.bottom;
      return acc;
    }, {
      left: 20000,
      top: 0,
      right: 0,
      bottom: 0
    });
  }

  private selectDescendant(nodes: INode[], nodeID: string, reclutedNodes: string[][] = []): string[] {
    if (!reclutedNodes[0]) {
      const parentNode = nodes.find(t => t.code === nodeID);
      if (parentNode) {
        reclutedNodes[0] = [parentNode.code];
        reclutedNodes.push(parentNode.childrenTree[0]);
      }
    } else {
      let nextLevelNodes: string[] = [];
      reclutedNodes[reclutedNodes.length - 1].map((nodeID) => {
        const parentNode = nodes.find(t => t.code === nodeID)?.childrenTree[0];
        if (parentNode) {
          nextLevelNodes = nextLevelNodes.concat(parentNode);
        }
      });

      if (nextLevelNodes.length === 0) {
        return reclutedNodes.flat();
      }

      reclutedNodes.push([...new Set(nextLevelNodes)])
    }
    return this.selectDescendant(nodes, nodeID, reclutedNodes);
  }

  private blockByParents(nodes: INode[]): INode[] {
    const blockedByParentNodes = nodes
      .filter(node => node.status === NodeStatus.blocked)
      .map(node => this.selectDescendant(nodes, node.code))
      .flat();
    return nodes.map(node => ({
      ...node,
      blockedByParents: blockedByParentNodes.includes(node.code)
    }));
  }

  private highlightNodes(nodes: INode[], selectedNodes: string[], selected: boolean): INode[] {
    return nodes.map(node => ({
      ...node,
      selected: selectedNodes.includes(node.code)
    }))
  }

  private extractMVPs(nodes:INode[]) {
    const mvps = nodes.reduce((accum: any, current) => {
      const name = current.mvp.name;
      const id = current.mvp.id;
      return {
        ...accum,
        [id]: name
      }
    }, {})

    this._mvps.next(mvps);
  }

  private calculateTreeProgres(nodes: INode[]) {
    const progress = nodes.reduce((accum:any, current) => {
      const pts = current.estimation;
      const status = current.status;
      return {
        ...accum,
        [status]: (accum[status] || 0) + pts
      }
    }, {})

    this._treeProgress.next(progress);
    localStorage.setItem('progress', JSON.stringify(progress));
  }

  onSelectNode(nodeID: string) {
    const selectedNodes = this.selectDescendant(this.nodeTree, nodeID);
    this.nodeTree = this.highlightNodes(this.nodeTree, selectedNodes, true);
    this._nodeTree.next(this.nodeTree);
  }

  onInfoNode(nodeData: INode) {
    console.log(nodeData)
  }

  onSelectMVP(mvp?: string) {
    const nodes = this.nodeTree.filter(node=> node.mvp.name === mvp)
    const codes = nodes.map(t=>t.code) || [];
    this.nodeTree = this.highlightNodes(this.nodeTree, codes, false);
    const nodesToCalculate = mvp === 'None' ? this.nodeTree : nodes;
    this._nodeTree.next(this.nodeTree);
    this.calculateTreeProgres(nodesToCalculate);
  }
}
