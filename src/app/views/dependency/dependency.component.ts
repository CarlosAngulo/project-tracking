import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { JiraService } from 'src/app/services/jira.service';
import { INode, NodeStatus, TicketsService } from 'src/app/services/ticketss.service';
import { cardProps } from '../../cards/card/card.props';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent {
  @ViewChild('container') container!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.containerWidth = event.target.innerWidth;
  }
  containerWidth!: number;
  mvps: any[] = [];
  nodeTree:  INode[] = [];
  parentNodes!: INode[];
  progressStatus: any = {};
  title = 'Q3.3.1 Grouping in Report Builder (Composition and Profile Report)';
  showView = false;
  showLoader = true;

  constructor(
    readonly ticketService: TicketsService,
    readonly jiraService: JiraService) {
    this.sortDependencies(ticketService.tickets);
    // jiraService.getEpic().subscribe((res) => console.log(res));
  }

  ngAfterViewInit() {
    // TO DO: Mover al Resize Service para realizar subscripción.
    this.containerWidth = this.container.nativeElement.offsetWidth;
  }

  sortDependencies(nodes: INode[]) {
    // Creates the three
    let nodeTree = this.nodesTree(nodes);

    // Add children
    nodeTree = this.addChildren(nodeTree);
    
    // Add positions
    nodeTree = this.addPositions(nodeTree);
    
    // Adds parents coords
    nodeTree = this.addParentCoodrs(nodeTree);
    
    // Block child nodes
    nodeTree = this.blockByParents(nodeTree);

    this.nodeTree = nodeTree;

    console.log(this.nodeTree);

    this.progressStatus = this.treeProgres(this.nodeTree);

    this.mvps = this.extractMVPs(nodes);
  }

  nodesTree(firstList: INode[], secondList: INode[] = [], level: number = 0 ): INode[] {
    if (firstList.length === 0) {
      return secondList;
    }
    
    let parentNodes = firstList
    .filter( node => node.parents?.length === 0)
    .map((node, index) => ({...node, level, index }));

    if (parentNodes?.length === 0) {
      // creates next level
      secondList.forEach((parentNode) => {
        parentNodes = parentNodes
        .concat(firstList
          .filter(node => node.parents?.includes(parentNode.code))
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

  addChildren(nodes: INode[]) {
    const newNodes = [...nodes]
    nodes.forEach(node => {
      node.parents?.forEach(parent => {
        const parentIndex = newNodes.findIndex( newNode => newNode.code === parent);
        newNodes[parentIndex].children = newNodes[parentIndex]?.children?.concat(node.code);
        newNodes[parentIndex].childrenTree = [newNodes[parentIndex].children];
      })
    });
    nodes.forEach(node => {
      this.addChildrenTree(nodes, node);
    });
    return newNodes;
  }

  addChildrenTree(nodes: INode[], node?: INode): INode | void {
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

  addTreeChildrenNextLevel(nodes:INode[], currentNode?: INode): string[] {
    if (!currentNode) {
      return [];
    }
    const currentTree = currentNode.childrenTree[currentNode.childrenTree.length - 1];
    let childrenNextLevel: string[] = []
    if (currentTree) {
      childrenNextLevel = currentTree.map(nodeCode => nodes
        .find( item => item.code === nodeCode)?.children || []
      )
      .flat()
    }
    return [...new Set(childrenNextLevel)]
  }

  addPositions(nodes: INode[]): INode[] {
    nodes = nodes.map(currentNode => {
      const previousPositions = nodes
        .filter(node=> node.level === currentNode.level && node.index < currentNode.index)
        .map(node => this.nodeBiggestChildRow(node) * (cardProps.width + cardProps.gap.x))
        .reduce((acc, curr) => acc + curr, 0);
      const centerPosition = this.nodeBiggestChildRow(currentNode) * (cardProps.width + cardProps.gap.x) / 2;
      return {
        ...currentNode,
        position: {
          x: previousPositions + centerPosition,
          y: currentNode.level * (cardProps.height + cardProps.gap.y) + cardProps.header
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
      const offsetByParent = (parent?.position.x || 0) - (((parent?.children.length || 0) - 1) * (cardProps.width + cardProps.gap.x) / 2 );
      const indexOnParent = parent?.children.findIndex(childrenCode => childrenCode === currentNode.code) || 0;
      const offsetBySiblings = (indexOnParent) * (cardProps.width + cardProps.gap.x);
      if (currentNode.level > maxNodesLevel.index ) {
        currentNode.position.x = offsetByParent + offsetBySiblings;
      }
    })
    return nodes;
  }

  nodeBiggestChildRow(node:INode) :number {
    return node.childrenTree.reduce((acc, curr)=> acc > curr.length ? acc : curr.length , 1)
  }

  addParentCoodrs(nodes: INode[]) {
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

  selectDescendant(nodes: INode[], nodeID: string, reclutedNodes: string[][] = []): string[] {
    if (!reclutedNodes[0]) {
      const parentNode = nodes.find(t => t.code === nodeID);
      if (parentNode) {
        reclutedNodes[0] = [parentNode.code];
        reclutedNodes.push(parentNode.children);
      }
    } else {
      let nextLevelNodes: string[] = [];
      reclutedNodes[reclutedNodes.length - 1].forEach((nodeID) => {
        const parentNode = nodes.find(t => t.code === nodeID)?.children;
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

  extractMVPs(nodes:INode[]) {
    return nodes.reduce((accum: any, current) => {
      const name = current.mvp.name;
      const id = current.mvp.id;
      return {
        ...accum,
        [id]: name
      }
    }, {})
  }

  treeProgres(nodes: INode[]) {
    return nodes.reduce((accum:any, current) => {
      const pts = current.estimation;
      const status = current.status;
      return {
        ...accum,
        [status]: (accum[status] || 0) + pts
      }
    }, {})
  }

  blockByParents(nodes: INode[]): INode[] {
    const blockedByParentNodes = nodes
      .filter(node => node.status === NodeStatus.blocked)
      .map(node => this.selectDescendant(nodes, node.code))
      .flat();
    return nodes.map(node => ({
      ...node,
      blockedByParents: blockedByParentNodes.includes(node.code)
    }));
  }

  highlightNodes(nodes: INode[], selectedNodes: string[], selected: boolean): INode[] {
    return nodes.map(node => ({
      ...node,
      selected: selectedNodes.includes(node.code)
    }))
  }

  onSelectNode(nodeID: string) {
    const selectedNodes = this.selectDescendant(this.nodeTree, nodeID);
    this.nodeTree = this.highlightNodes(this.nodeTree, selectedNodes, true);
  }

  onInfoNode(nodeData: INode) {
    console.log(nodeData)
  }

  onSelectMVP(mvp?: string) {
    const nodes = this.nodeTree.filter(node=> node.mvp.name === mvp)
    const codes = nodes.map(t=>t.code) || [];
    this.nodeTree = this.highlightNodes(this.nodeTree, codes, false);
    const nodesToCalculate = mvp === 'None' ? this.nodeTree : nodes;
    this.progressStatus = this.treeProgres(nodesToCalculate);
  }

  onJSONLoad(project:any) {
    this.onShowLoader(false)
    this.sortDependencies(project.tickets)
  }
  
  onShowLoader(event:boolean) {
    this.showLoader = event;
  }
}
