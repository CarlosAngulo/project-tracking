import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INode, IProject, NodeStatus } from 'src/app/interfaces/nodes.inteface';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseService } from 'src/app/services/project-loader/firebase.service';
import { ProjectService } from 'src/app/services/project-loader/project.service';
import { Mode } from 'src/app/services/tickets/ticket.service';

export enum EditableFields {
  NONE = '',
  STATUS = 'status',
  TITLE = 'title',
  ESTIMATION = 'estimation',
  DESCRIPTION = 'description',
  CODE = 'code',
  ASIGNEE = 'asignee',
}

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
  data!: INode;
  project!: IProject;
  nodeStaus = NodeStatus;
  editableFields = EditableFields;
  modes = Mode;
  mode = Mode.CREATE;
  form!: FormGroup;
  editingField = EditableFields.NONE;
  ticketList: Partial<INode>[] = [];
  ticketListFiltered: Partial<INode>[] = [];
  parents: Partial<INode>[] = [];
  private unsub$ = new Subject<void>();
  
  statuses = [
    NodeStatus.blocked,
    NodeStatus.done,
    NodeStatus.new,
    NodeStatus.progress,
    NodeStatus.review,
    NodeStatus.undefined
  ]

  constructor(
    private ticketService: TicketService,
    private nodeTreeService: NodeTreeService,
    private firebaseService: FirebaseService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    this.setupData(this.projectService.project, this.ticketService.getnodeData())

    this.nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((res) => this.ticketList = res);

    this.ticketService.getNodeData$()
    .pipe(takeUntil(this.unsub$))
    .subscribe((node: INode) => {
      this.setupData(this.projectService.project, node)
    });

  }

  setupData( project: IProject, node: INode ) {
    this.project = project;
    this.ticketList = project.tickets.map(ticket => ({
      code: ticket.code,
      id: ticket.id,
      title: ticket.title
    }));
    this.mode = this.ticketService.mode;
    this.data = node;
    this.parents = [];
    this.data.parents.forEach(parent => {
      const ticket = this.ticketList.find(ticket => ticket.code === parent);
      if (ticket !== undefined) {
        this.parents.push(ticket);
      }
    });
    this.uptadeFilteredTickets();
    this.setupForm();
  }

  setupForm(){
    this.form = this.fb.group({
      asignee: [this.data?.asignee?.name],
      code: [this.data?.code, Validators.required],
      description: [this.data?.description],
      estimation: [this.data?.estimation, Validators.required],
      status: [this.data?.status, Validators.required],
      title: [this.data?.title, Validators.required],
    });
  }

  closeModal() {
    this.ticketService.openDetailsPanel(false);
  }

  onSave() {
    if( this.mode == Mode.EDIT ) {
      const controls = this.form.controls;
      let modifiedFields = {};
      for (const field in controls) {
        if (controls[field].dirty) {
          modifiedFields = {
            ...modifiedFields,
            [field]: controls[field].value
          }
        }
      }
      this.firebaseService.updateTicket(this.data?.id, modifiedFields)
      .then( res => this.closeModal())
      .catch(console.error);
    } else if( this.mode == Mode.CREATE ) {
      this.firebaseService.createTicket(this.form.value, this.project.docId)
      .then( res => {
        this.closeModal();
      })
      .catch(console.error);
    }
  }

  onEditField(evt: MouseEvent, field: EditableFields) {
    this.editingField = field;
  }

  onEditedField(val: any) {
    this.form.get(this.editingField)?.patchValue(val);
    console.log(this.form.value);
  }

  uptadeFilteredTickets() {
    this.ticketListFiltered = this.ticketList.filter(ticket => !this.parents.map(parent=> parent.code).includes(ticket.code));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }

}
