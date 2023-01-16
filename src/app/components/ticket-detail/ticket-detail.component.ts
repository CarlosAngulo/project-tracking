import { Component, OnDestroy, OnInit } from '@angular/core';
import { INode, IPerson, IProject, NodeStatus } from 'src/app/interfaces/nodes.inteface';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseService } from 'src/app/services/project-loader/firebase.service';
import { ProjectService } from 'src/app/services/project-loader/project.service';
import { Mode } from 'src/app/services/tickets/ticket.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { IDropDown } from '../dropdown/dropdown.component';
import { UserService } from 'src/app/features/users/user.service';

export interface IEditableFields extends Record<string, boolean> {}

export enum EditableFields {
  NONE = '',
  STATUS = 'status',
  TITLE = 'title',
  ESTIMATION = 'estimation',
  DESCRIPTION = 'description',
  CODE = 'code',
  ASSIGNED = 'assigned',
  PARENTS = 'parents',
}

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
  assigned!: any;
  data!: INode;
  project!: IProject;
  nodeStaus = NodeStatus;
  editableFields = EditableFields;
  modes = Mode;
  mode = Mode.CREATE;
  form!: FormGroup;
  peopleList: IPerson[] = [];
  filteredPeople!: IDropDown[];
  ticketList: Partial<INode>[] = [];
  ticketListFiltered: any[] = [];
  parents: Partial<INode>[] = [];
  activeDropdown = EditableFields.NONE;
  editable = false;
  private unsub$ = new Subject<void>();

  editingFields: IEditableFields =  {
    [EditableFields.NONE]: false,
    [EditableFields.STATUS]: false,
    [EditableFields.TITLE]: false,
    [EditableFields.ESTIMATION]: false,
    [EditableFields.DESCRIPTION]: false,
    [EditableFields.CODE]: false,
    [EditableFields.ASSIGNED]: false,
    [EditableFields.PARENTS]: false,
  }
  
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
    private peopleService: PeopleService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    this.peopleList = this.peopleService.people;

    this.setupData(this.projectService.project, this.ticketService.getnodeData());

    this.nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((res) => this.ticketList = res);

    this.ticketService.getNodeData$()
    .pipe(takeUntil(this.unsub$))
    .subscribe((node: INode) => {
      this.onEditField(undefined, EditableFields.NONE);
      this.setupData(this.projectService.project, node);
    });

    this.editable = this.userService.hasSession;

    this.userService.getUser$()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => {
      if(res === null) {
        this.editable = false;
        this.resetEditingFields()
      } else {
        this.editable = true;
      }
    })
  }

  setupData( project: IProject, node: INode ) {
    this.project = project;
    this.ticketList = project.tickets.map(ticket => ({
      code: ticket.code,
      id: ticket.id,
      title: ticket.title,
      childrenTree: ticket.childrenTree
    }));
    this.mode = this.ticketService.mode;
    if (this.mode === Mode.CREATE) {
      this.resetEditingFields(undefined, true);
    }
    this.data = node;
    this.parents = [];
    this.data.parents.forEach(parent => {
      const ticket = this.ticketList.find(ticket => ticket.id === parent);
      if (ticket !== undefined) {
        this.parents.push(ticket);
      }
    });
    this.assigned = this.data?.assigned;
    this.updateFilteredParentList();
    this.updateFilteredPeople()
    this.setupForm();
  }

  setupForm(){
    this.form = this.fb.group({
      assigned: [this.assigned?.name],
      code: [this.data?.code, Validators.required],
      description: [this.data?.description],
      estimation: [this.data?.estimation, Validators.required],
      status: [this.data?.status, Validators.required],
      title: [this.data?.title, Validators.required],
      parents: [this.data.parents]
    });
  }

  closeModal() {
    this.ticketService.openDetailsPanel(false);
  }

  onSave() {
    if( this.mode == Mode.EDIT ) {
      const controls = this.form.controls;
      let modifiedFields: any = {};
      for (const field in controls) {
        if (controls[field].dirty === true) {
          modifiedFields = {
            ...modifiedFields,
            [field]: controls[field].value
          }
          if (field === this.editableFields.ASSIGNED) {
            modifiedFields.assigned = controls[field].value.id;
          }
        }
      }
      this.closeModal();
      this.firebaseService.updateTicket(this.data?.id, modifiedFields)
      .catch(console.error);
    } else if( this.mode == Mode.CREATE ) {
      this.firebaseService.createTicket(this.form.value, this.project.docId)
      .then( res => {
        this.closeModal();
      })
      .catch(console.error);
    }
  }

  resetEditingFields(objKey?: string, val: boolean = false) {
    Object
    .keys(this.editingFields)
    .forEach((key) => {
      this.editingFields[key] = key === objKey ? true : val;
    });
  }

  onEditField(evt: MouseEvent | undefined, field: EditableFields) {
    if (this.editable)
      this.resetEditingFields(field);
  }

  onStatusChange(status: string | number) {
    this.resetEditingFields(EditableFields.NONE);
    const statusField = this.form.get('status');
    statusField?.patchValue(status);
    this.markAsDirty(statusField);
  }

  onShowDropdown(val: EditableFields) {
    this.activeDropdown = val;
  }

  onParentSelect(event: string | number) {
    if (event === '') return;
    const selectedTicket = this.ticketList.find(ticket => ticket.id === event);
    if (selectedTicket) {
      this.parents.push(selectedTicket);
      const parentsField = this.form.get('parents');
      parentsField?.patchValue(this.parents.map(parent => parent.id));
      this.markAsDirty(parentsField);
      this.updateFilteredParentList();
    }
  }

  onParentDelete(event: string) {
    this.parents = this.parents.filter(parent => parent.id !== event);
    const parentsField = this.form.get('parents');
    parentsField?.patchValue(this.parents.map(parent => parent.id));
    this.markAsDirty(parentsField);
    this.updateFilteredParentList(event);
  }

  onAssignedChanged(event: string | number) {
    if (event === '') return;
    const assigned = this.peopleList.find(person => person.id === event);
    if (assigned) {
      this.assigned = {
        name: assigned.name,
        value: assigned.id
      };
      this.resetEditingFields(EditableFields.NONE);
      const assignedField = this.form.get('assigned');
      this.updateFilteredPeople();
      assignedField?.patchValue(assigned);
      this.markAsDirty(assignedField);
      this.updateFilteredPeople();
    }
  }

  updateFilteredParentList(ticketToAdd?: string) {
    // console.log('parents:', this.parents.map(t=>t.code))
    // console.log('ancestors', this.ticketList.filter(ticket => ticket.childrenTree?.flat().includes(this.data.id)).map(t=>t.code))
    // console.log('childrentree', this.ticketList.find(ticket => ticket.code === this.data.code)?.childrenTree?.flat())

    this.ticketListFiltered = this.ticketList
    // TODO: Remove siblings
      .filter(ticket => 
        // removes this ticket
        ticket.id !== this.data.id &&
        // removes direct parents
        !this.parents.map(t => t.id).includes(ticket.id) &&
        // removes ancestors
        (ticket.id && !this.ticketList.find(ticket => ticket.id === this.data.id)?.childrenTree?.flat().includes(ticket.id)) &&
        // removes childrenTree
        !ticket.childrenTree?.flat().includes(this.data.id)
      )
      .map(ticket => ({
        name: ticket.code + ' - ' + ticket.title,
        value: ticket.id,
      }));
    
    if (ticketToAdd) {
      this.ticketListFiltered = this.ticketListFiltered.concat(
        this.ticketList
        .filter(ticket => 
          ticket.id === ticketToAdd ||
          ticket.childrenTree?.flat().includes(ticketToAdd)
        )
        .map( ticket => ({
            name: ticket.code + ' - ' + ticket.title,
            value: ticket.id,
        }))
      )
    }
  }

  updateFilteredPeople() {
    this.filteredPeople = this.peopleList
    .filter(person => person.id !== this.assigned?.id)
    .map(person => ({
      name: person.name,
      value: person.id
    }));
  }

  markAsDirty(field: AbstractControl<any, any> | null) {
    field?.markAsDirty({onlySelf: true});
    this.form.markAsDirty();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }

  moveToTrash() {
    this.closeModal();
    this.ticketService.moveToTrash(this.projectService.getTicketRefById(this.data.id), this.data.children)
    .subscribe();
  }
}
