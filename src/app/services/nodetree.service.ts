import { Injectable } from '@angular/core';
import { cardProps } from '../cards/card/card.props';
import { IBlockStatus, Iconstraints, INode, IProject, NodeStatus } from '../interfaces/nodes.inteface';
import { Observable, Subject } from 'rxjs';
import { IDropDown } from '../components/dropdown/dropdown.component';

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
  
  private constraints!: Iconstraints;
  private _constraints: Subject<Iconstraints> = new Subject();
  private constraints$: Observable<Iconstraints> = this._constraints.asObservable();

  private  nodeTree: INode[] = [];
  private  _nodeTree: Subject<INode[]> = new Subject();
  private nodeTree$: Observable<INode[]> = this._nodeTree.asObservable();

  public treeProgress!: IBlockStatus[];
  private _treeProgress: Subject<IBlockStatus[]> = new Subject();
  private treeProgress$: Observable<IBlockStatus[]> = this._treeProgress.asObservable();

  private _isLoadWindowOpen: Subject<boolean> = new Subject();
  private isLoadWindowOpen$: Observable<boolean> = this._isLoadWindowOpen.asObservable();

  public isProjectLoaded = false;
  private childrenList: string[] = [];
   
  constructor() {};

  getStaticNodeTree() {
    return this.nodeTree;
  }

  getConstraints() {
    return this.constraints;
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

  getconstraints(): Observable<Iconstraints> {
    return this.constraints$;
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
        childrenTreeSimple: [],
        index: 0,
        level: 0,
        childrenWidth: 0,
        enabled: true,
        position: {x: 0, y:0, offsetX: 0},
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

    // Sort nodes by order field
    let nodeTree = this.sortNodes(nodes);
    
    // Creates the three
    nodeTree = this.nodesTree(nodes);

    // Add children
    nodeTree = this.addChildren(nodeTree);
    // console.log(this.addSimpleChildrenTree(nodeTree))
    
    nodeTree = this.addChildrenWidth(nodeTree)
    
    // Add positions
    nodeTree = this.addNewPositions(nodeTree);
    
    // Adds parents coords
    nodeTree = this.addParentCoodrs(nodeTree);
    
    // Block child nodes
    nodeTree = this.blockByParents(nodeTree);

    // Enable node if parents are done
    nodeTree = this.disableNodes(nodeTree);

    this.nodeTree = nodeTree;

    // console.log(this.nodeTree)
    // console.log(this.nodeTree.map(n=>n.code))
    
    this._nodeTree.next(nodeTree);

    this.calculateTreeProgress(this.nodeTree);

    this.extractMVPs(nodes);
  }

  private sortNodes(nodes: INode[]) {
    return nodes
    .sort((p1, p2) => (p1.order < p2.order) ? 1 : (p1.order > p2.order) ? -1 : 0);
  }

  private nodesTree(firstList: INode[], secondList: INode[] = [], level: number = 0 ): INode[] {
    if (firstList.length === 0) {
      return secondList;
    }
    
    let parentNodes = firstList
    .filter( node => node.parents?.length === 0)
    .map((node, index) => ({...node, level, index }));

    // console.log(firstList.filter( node => !firstList.map(i => i.code).includes(node.parents[0])))

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
      childrenTreeSimple: [nodes.filter(node => node.parents[0] === currentNode.code).map(node=>node.code)]
    }))
    newNodes.forEach(node => {
      this.addChildrenTree(nodes, node);
      this.addSimpleChildrenTree(nodes, node)
    });
    return newNodes;
  }

  private addChildrenTree(nodes: INode[], node?: INode): INode | void {
    if (!node) {
      return;
    }
    const nextChildrenLevel = this.addTreeChildrenNextLevel(nodes, node);
    if (nextChildrenLevel.length === 0) {
      return node;
    }
    node.childrenTree.push(nextChildrenLevel);
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

  private addSimpleChildrenTree(nodes: INode[], node?: INode) : INode | void {
    if (!node) {
      return;
    }
    const nextChildrenLevel = this.addSimpleTreeChildrenNextLevel(nodes, node);
    if (nextChildrenLevel.length === 0) {
      return node;
    }
    node.childrenTreeSimple.push(nextChildrenLevel);
    return this.addSimpleChildrenTree(nodes, node);
  }

  private addSimpleTreeChildrenNextLevel(nodes: INode[], currentNode: INode): string[] {
    if (!currentNode) {
      return [];
    }
    const currentTree = currentNode.childrenTreeSimple[currentNode.childrenTreeSimple.length - 1];
    return nodes.filter( node => currentTree.includes(node.parents[0])).map(node=>node.code)
  }

  private addChildrenWidth(nodes: INode[]): INode[] {
    return nodes
    .reverse()
    .map(node => {
      const childrenWidth = node.childrenTreeSimple[0].length;
      const grandChildrenWidth = nodes
        .filter(currentNode => node.childrenTreeSimple[0].includes(currentNode.code))
        .reduce((acc, curr) => acc + curr.childrenWidth, 0);
      node.childrenWidth = node.code === 'AMC-12560' ? 6 : Math.max(childrenWidth, grandChildrenWidth) || 1;
      return node;
    })
    .reverse();
  }

  private addNewPositions(nodes: INode[]): INode[] {
    const _nodes = [...nodes];
    _nodes.forEach(currentNode => {
      const parent = nodes.find(node => currentNode.parents[0] === node.code);
      const offsetBySlibing = this.previousPositions(currentNode, nodes, parent);
      currentNode.position.x = (parent?.position.x || 0) - (((parent?.childrenWidth || 0) - currentNode.childrenWidth) * (cardProps.width + cardProps.gap.x) / 2) + offsetBySlibing;
      currentNode.position.y= currentNode.level * (cardProps.height + cardProps.gap.y) + cardProps.margin.y;
    })

    this.constraints = this.calculateconstraints(nodes);
    this._constraints.next(this.constraints);
    
    return _nodes.map(node=> ({
      ...node,
      position: {
        y: node.position.y,
        x: node.position.x - this.constraints.left + cardProps.margin.x
      } 
    }));
  }

  private previousPositions(currentNode: INode | undefined, nodes:INode[], parent?:INode): number {
    if (!currentNode) return 0;
    return nodes
      .filter(node=> {
        const sameLevel = node.level === currentNode.level;
        const lowerIndex = node.index < currentNode.index;
        if (parent === undefined) {
          return lowerIndex && sameLevel;
        }
        return lowerIndex && parent?.childrenTreeSimple[0].includes(node.code);
      })
      .map(node => node.childrenWidth * (cardProps.width + cardProps.gap.x))
      .reduce((acc, curr) => acc + curr, 0);
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

  private calculateconstraints(nodes: INode[]) {
    return nodes.reduce((acc, curr) => {
      acc.left = curr.position.x < acc.left ? curr.position.x : acc.left;
      acc.top = curr.position.y < acc.top ? curr.position.y : acc.top;
      acc.right = curr.position.x > acc.right ? curr.position.x : acc.right;
      acc.bottom = curr.position.y > acc.bottom ? curr.position.y : acc.bottom;
      return acc;
    }, {
      left: 200000,
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
    const mvps: IDropDown[] = nodes.reduce((accum: any, current) => {
      const name = current.mvp.name;
      const id = current.mvp.id;
      const mvpIndex = accum.findIndex((item:IDropDown) => item.value === current.mvp.id)
      if (mvpIndex === -1) {
        return [
          ...accum,
          {
            name,
            value:id
          }
        ]
      } else {
        return accum
      }
    }, [])
    // console.log('mvps', mvps)
    this._mvps.next(mvps);
  }

  private calculateTreeProgress(nodes: INode[]) {
    const progress = nodes.reduce((accum:any, current) => {
      const pts = current.estimation;
      const currentStatus = current.status;
      const currentStatusIndex = accum.findIndex((status:IBlockStatus) => status.name === currentStatus) || 0;
      const newStatus = {
        name: currentStatus,
        count: (accum[currentStatusIndex]?.count || 0) + 1,
        points: (accum[currentStatusIndex]?.points || 0) + pts
      }
      if (currentStatusIndex > -1) {
        accum[currentStatusIndex] = newStatus
      } else {
        accum.push(newStatus)
      }
      return accum
    }, [])

    this._treeProgress.next(progress);
    localStorage.setItem('progress', JSON.stringify(progress));
  }

  private maxNodesLevel(nodes: INode[]): {index: number, val: number} {
    return nodes
    .reduce((acc:number[], curr:INode) => {
      acc[curr.level] = (acc[curr.level] || 0) + 1;
      return acc;
    }, [])
    .reduce((acc, curr, index) => curr > acc.val ? {index, val: curr} : {...acc}, {index: 0, val: 0})
  }

  disableNodes(nodes: INode[]): INode[] {
    return nodes.map(currentNode => ({
      ...currentNode,
      enabled: nodes
      .filter(node => currentNode.parents.includes(node.code))
      .every(node => node.status === NodeStatus.done)
    }))
  }

  onSelectNode(nodeID: string) {
    const selectedNodes = this.selectDescendant(this.nodeTree, nodeID);
    this.nodeTree = this.highlightNodes(this.nodeTree, selectedNodes, true);
    this._nodeTree.next(this.nodeTree);
  }

  onInfoNode(nodeData: INode) {
    console.log(nodeData)
  }

  onSelectMVP(mvp?: string | number) {
    const nodes = this.nodeTree.filter(node=> node.mvp.id === mvp)
    const codes = nodes.map(t=>t.code) || [];
    this.nodeTree = this.highlightNodes(this.nodeTree, codes, false);
    const nodesToCalculate = mvp === '' ? this.nodeTree : nodes;
    this._nodeTree.next(this.nodeTree);
    this.calculateTreeProgress(nodesToCalculate);
  }
}
