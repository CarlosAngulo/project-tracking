import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { cardProps } from 'src/app/cards/card/card.props';
import { Iconstraints, INode} from 'src/app/interfaces/nodes.inteface';
import { JiraService } from 'src/app/services/jira.service';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent implements OnInit {
  bgStyles: any = {};
  zoomStyle!: any;
  nodeTree:  INode[] = [];
  private unsub$ = new Subject<void>();

  constructor(
    readonly jiraService: JiraService,
    readonly nodeTreeService: NodeTreeService,
    readonly viewService: ViewService
  ){
    if (localStorage.getItem('project')) {
      this.bgStyles = this.calculateBg(nodeTreeService.getConstraints())
      this.nodeTree = nodeTreeService.getStaticNodeTree();
    }
    this.nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((nodeTree: INode[]) => {
      this.nodeTree = nodeTree;
    })
    this.nodeTreeService.getconstraints()
    .pipe(takeUntil(this.unsub$))
    .subscribe((constraints: Iconstraints) => {
      this.bgStyles = this.calculateBg(constraints);
    })
    this.viewService.getZoom()
    .pipe(takeUntil(this.unsub$))
    .subscribe((zoomLevel: number) => {
      this.bgStyles = {
        ...this.bgStyles,
        transform: `scale(${0.9 + zoomLevel * 0.1})`
      }
      this.zoomStyle = {'transform': `scale(${1 + zoomLevel * 0.1})`};
    })
  }

  calculateBg(constraints: Iconstraints) {
    return {
      width: constraints.right - constraints.left + cardProps.width + (2 * cardProps.margin.x) + 'px',
      height: constraints.bottom - constraints.top + cardProps.height + cardProps.margin.y + 'px'
    };
  }
  
  ngOnInit(): void {
  }

  onSelectNode(nodeID: string) {
    this.nodeTreeService.onSelectNode(nodeID)
  }

  onInfoNode(nodeData: INode) {

  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }

}
