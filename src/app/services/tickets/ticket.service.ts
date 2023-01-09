import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INode, NodeStatus } from 'src/app/interfaces/nodes.inteface';

export enum Mode {
  CREATE = 'create',
  EDIT = 'edit'
}
export class Node implements INode {
  id = '';
  code = '';
  status = NodeStatus.new;
  title = '';
  estimation = 0;
  effort = [];
  parents = [];
  assigned = { name: '', id: '' };
  children = [];
  order = 0;
  enabled = true;
  mvp = { name: '', id: 0, };
  position = {x: 0, y: 0};
  level = 0;
  index = 0;
  childrenTree = [];
  childrenTreeSimple = [];
  childrenWidth = 0;
  selected = false;
  blockedByParents = false;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  private ticket!: INode;
  private _ticket: Subject<INode> = new Subject();
  private ticket$: Observable<INode> = this._ticket.asObservable();
  
  private _mode: Mode = Mode.EDIT;
  // private _ticketMode: Subject<Mode> = new Subject();
  // private ticketMode$: Observable<Mode> = this._ticketMode.asObservable();

  private _showDetailsPanel: Subject<boolean> = new Subject();
  private showDetailsPanel$: Observable<boolean> = this._showDetailsPanel.asObservable();

  openDetailsPanel(open: boolean) {
    this._showDetailsPanel.next(open);
  }

  isDetailsPanelOpen(): Observable<boolean> {
    return this.showDetailsPanel$;
  }

  setNodeData(ticket?: INode) {
    this._showDetailsPanel.next(true);
    this._mode = !ticket ? Mode.CREATE : Mode.EDIT;
    this.ticket = ticket || new Node();
    this._ticket.next(this.ticket);
  }

  getNodeData$(): Observable<INode> {
    return this.ticket$;
  }

  getnodeData(): INode {
    return this.ticket;
  }

  get mode(): Mode {
    return this._mode;
  }
}