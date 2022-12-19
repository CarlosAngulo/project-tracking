import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INode } from 'src/app/interfaces/nodes.inteface';

export class Ticket {
    children: string[] = [];
    childrenTree: string[][] = [];
    childrenTreeSimple: string[][] = [];
    index: number = 0;
    level: number = 0;
    childrenWidth: number = 0;
    enabled: boolean = true;
    position = {x: 0, y:0, offsetX: 0};
    blockedByParents = false;
    selected = false;
    constructor(
        title: string,
        code: string,
    ) {

    }
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticket: INode | undefined;
  private _ticket: Subject<INode | undefined> = new Subject();
  private ticket$: Observable<INode | undefined> = this._ticket.asObservable();
  
  private _showDetailsPanel: Subject<boolean> = new Subject();
  private showDetailsPanel$: Observable<boolean> = this._showDetailsPanel.asObservable();

  openDetailsPanel(open: boolean) {
    this._showDetailsPanel.next(open);
  }

  isDetailsPanelOpen(): Observable<boolean> {
    return this.showDetailsPanel$;
  }

  setNodeData(ticket: INode | undefined) {
    console.log('setNodeData', ticket?.code);
    this.ticket = ticket;
    this._ticket.next(ticket);
    this._showDetailsPanel.next(true);
  }

  getNodeData$(): Observable<INode | undefined> {
    return this.ticket$;
  }

  getnodeData(): INode | undefined {
    return this.ticket;
  }
}