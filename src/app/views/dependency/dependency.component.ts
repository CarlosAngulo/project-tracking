import { Component, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { INode} from 'src/app/interfaces/nodes.inteface';
import { JiraService } from 'src/app/services/jira.service';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent implements OnInit {
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
