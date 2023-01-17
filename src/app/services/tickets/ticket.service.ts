import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { from, Observable, ObservableInput, of, Subject, switchMap } from 'rxjs';
import { INode, NodeStatus } from 'src/app/interfaces/nodes.inteface';
import { FirebaseService } from '../project-loader/firebase.service';
import { ProjectService } from '../project-loader/project.service';

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

  constructor(
    private firebaseService: FirebaseService,
    private projectService: ProjectService
  ){}

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
  
  moveToTrash(ticket: DocumentReference<DocumentData> | undefined, children: string[]): Observable<any> {
    if (ticket === undefined) return of({});
    if (children.length === 0) {
      return from(this.projectService.moveTicketToTrash(ticket));
    }
    return this.firebaseService.deleteParentsOnTickets(children, [ticket.id])
    .pipe(
      switchMap(res => this.projectService.moveTicketToTrash(ticket))
    )
  }
}