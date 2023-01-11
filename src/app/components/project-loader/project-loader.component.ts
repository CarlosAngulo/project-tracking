
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProject } from 'src/app/interfaces/nodes.inteface';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { IDropDown } from '../dropdown/dropdown.component';

export enum Mode {
  NEW = 'Create a new project',
  LOAD = 'Select your project',
}

@Component({
  selector: 'app-project-loader',
  templateUrl: './project-loader.component.html',
  styleUrls: ['./project-loader.component.scss']
})
export class ProjectLoaderComponent implements OnInit {
  @Output() onLoad: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();
  @Input() set projects(val: any[]) {
    this.projectNames = val.map((project:any) => ({
      name: project.name,
      value: project.docId
    }));
  };
  @Input() set people(val: any[]) {
    this.peopleNames = val.map((project:any) => ({
      name: project.name,
      value: project.id
    }));
  };

  form!: FormGroup;
  parseJSONError = false;
  projectLoaded = false;
  project!: IProject;
  projectNames!: IDropDown[];
  peopleNames!: IDropDown[];
  projectAssigned!: IDropDown;
  projectTitle!: String;
  selectedProjectID!: string;
  title = Mode.LOAD;
  mode = Mode.LOAD;
  modes = Mode;
  creationBtnDisabled = false;

  constructor(
    readonly nodeTreeService: NodeTreeService,
    private fb: FormBuilder
  ) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    }
  }

  setupForm(){
    this.form = this.fb.group({
      assigned: [this.projectAssigned, Validators.required],
      title: [this.projectTitle],
    });
  }

  onSelecProject(evt: string | number) {
    this.selectedProjectID = evt.toString();
  }

  onLoadProject(projectID: string | number) {
    this.onLoad.next(projectID.toString());
  }

  ngOnInit(): void {
    this.projectLoaded = this.nodeTreeService.isProjectLoaded;
    this.setupForm();
  }

  onInsert() {
    this.projectLoaded = true;
  }

  onClose() {
    this.onCancel.next(false)
  }

  onCancelClick() {
    if (this.mode === Mode.NEW) {
      this.goToView(Mode.LOAD);
      return;
    }
    if (this.mode === Mode.LOAD && this.projectLoaded) {
      this.onClose();
      return;
    }
  }

  onCreateNewProject() {

  }

  goToView(view: Mode) {
    this.title = this.mode = view;
  }

  goToLoadingView() {
    this.title = this.mode = Mode.LOAD;
  }

  selectProjectAssigned(event:any) {
    if (event === '') return;
    this.projectAssigned = this.people.find(person => person.id === event);
    const parentsField = this.form.get('parents');
    // parentsField?.patchValue(this.parents.map(parent => parent.id));
    // this.markAsDirty(parentsField);
    // this.updateFilteredTickets();
  }

  onSave() {
    const controls = this.form.controls;
    let modifiedFields: any = {};
    for (const field in controls) {
      if (controls[field].dirty) {
        modifiedFields = {
          ...modifiedFields,
          [field]: controls[field].value
        }
      }
    }
    console.log(modifiedFields)
  }
}
