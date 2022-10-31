import { Component, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { cardProps } from 'src/app/cards/card/card.props';
import { IConstrains, INode} from 'src/app/interfaces/nodes.inteface';
import { JiraService } from 'src/app/services/jira.service';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent implements OnInit {
  bgStyles: any = {};
  nodeTree:  INode[] = [];
  private unsub$ = new Subject<void>();

  constructor(
    readonly jiraService: JiraService,
    readonly nodeTreeService: NodeTreeService
  ){
    if (localStorage.getItem('project')) {
      this.nodeTree = nodeTreeService.getStaticNodeTree();
    }
    this.nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((nodeTree: INode[]) => {
      this.nodeTree = nodeTree;
    })
    this.nodeTreeService.getConstrains()
    .pipe(takeUntil(this.unsub$))
    .subscribe((constrains: IConstrains) => {
      this.bgStyles = {
        width: constrains.right - constrains.left + cardProps.width + (2 * cardProps.margin.x) + 'px',
        height: constrains.bottom - constrains.top + cardProps.height + cardProps.margin.y + 'px'
      };
    })
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
