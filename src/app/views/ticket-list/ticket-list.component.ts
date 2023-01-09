import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { INode } from 'src/app/interfaces/nodes.inteface';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnDestroy {
  ticketList:  INode[] = [];
  private unsub$ = new Subject<void>();

  constructor(
    readonly nodeTreeService: NodeTreeService
  ) {
    if (localStorage.getItem('project')) {
      this.ticketList = nodeTreeService.getStaticNodeTree();
    }
    nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((nodeTree: INode[]) => {
      this.ticketList = nodeTree.map(node => ({
        ...node,
        parents: node.parents.map(parent => nodeTree.find(item => item.id === parent)?.code || '')
      }))
    })
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }

}
