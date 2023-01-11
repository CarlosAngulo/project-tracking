import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from 'src/app/interfaces/nodes.inteface';
import { CSVParserService } from 'src/app/services/csv-parser.service';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { FirebaseService } from 'src/app/services/project-loader/firebase.service';
import { IDropDown } from '../dropdown/dropdown.component';
import { PROJECT } from './projects';

type AllowedExtensions = fileExtensions.CSV | fileExtensions.JSON;
enum fileExtensions {
  JSON = 'json',
  CSV = 'csv'
}
@Component({
  selector: 'app-json-loader',
  templateUrl: './json-loader.component.html',
  styleUrls: ['./json-loader.component.scss']
})
export class JsonLoaderComponent implements OnInit {
  @Output() onLoad: EventEmitter<string> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();
  @Input() set projects(val: any[]) {
    this.projectNames = val.map((project:any) => ({
      name: project.name,
      value: project.docId
    }));
  };

  parseJSONError = false;
  projectLoaded = false;
  fr!: FileReader;
  fileName!: string;
  fileExtensions = fileExtensions;
  uploadStatus = 'default';
  project!: IProject;
  projectNames!: IDropDown[];
  selectedProjectID!: string;

  loadProjectMessages = {
    success: {
      message: 'Congrats! Your projec is valid. Please click on the next button.'
    },
    failed: {
      message: 'The file does not complain the structure needed. Please downdolad one of the following files to create your own with the same strcuture.'
    },
    default: {
      message: "If you don't know what the format should be, please download the sample project:"
    }
  }

  constructor(
    readonly nodeTreeService: NodeTreeService, 
    readonly CSVParser: CSVParserService,
    readonly firebaseService: FirebaseService  
  ) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    } else {
      this.project = PROJECT;
    }

    // const csvPrimitive = CSVParser.csvToArray(this.csv);
    // const csvParsed = CSVParser.parseArray(csvPrimitive)
    // console.log(this.PROJECT.tickets[1])
    // console.log(csvParsed[1]);
    // console.log(this.jsonToCSV(this.PROJECT))

    // this.loadFirebaseTemp();
  }

  // loadFirebaseTemp() {
  //   this.firebaseService.getProjects()
  //   .subscribe(projects => {
  //     this.projects = projects;
  //     this.projectNames = projects.map((project:any) => project.name);
  //   });
  // }

  onSelecProject(evt: string | number) {
    this.selectedProjectID = evt.toString();
  }

  onLoadProject(projectID: string) {
    this.onLoad.next(projectID);
  }

  onUploadFile(event: any) {
    this.fileName = event.target.files[0].name
    const fileExtension = this.fileName.split('.').pop();
    this.fr = new FileReader();
    this.fr.onload = () => {
      this.validateExtension(this.fr.result, fileExtension || '')
    }
    this.fr.readAsText(event.target.files[0]);
  }

  loadSampleProject() {
    this.project = PROJECT;
    // this.onLoad.next(this.project);
    this.projectLoaded = true;
  }

  validateExtension(project: any, fileType: string) {
    if (fileType === fileExtensions.CSV) {
      const csvPrimitive = this.CSVParser.csvToArray(project);
      const csvParsed = this.CSVParser.parseArray(csvPrimitive)
      this.project = {
        docId: 'AAA',
        name: 'Project Name',
        leader: 'N N',
        tickets: csvParsed
      }
      this.projectLoaded = true;
      this.uploadStatus = 'success';
    }
    if (fileType === fileExtensions.JSON) {
      try {
        this.project = JSON.parse(project);
        this.parseJSONError = false;
        this.projectLoaded = true;
        this.uploadStatus = 'success';
      }
      catch(e) {
        this.parseJSONError = true;
        this.uploadStatus = 'failed';
      };
    }
  }

  downloadFile(type: AllowedExtensions) {
    if (type == fileExtensions.CSV) {
      this.download(this.jsonToCSV(PROJECT), 'proyecto.csv', 'csv')
    }
    if (type == fileExtensions.JSON) {
      this.download(PROJECT, 'proyecto1.json', 'json')
    }
  }

  ngOnInit(): void {
    this.projectLoaded = this.nodeTreeService.isProjectLoaded;
  }

  get projectValue () {
    return JSON.stringify(this.project, null, 2);
  }

  jsonToCSV(project: IProject): string {
    const header = 'CODE;ASSIGNED;TITLE;ESTIMATION;STATUS;EFFORT;PARENTS;MVP';
    const csv = project.tickets.map(ticket => `${ticket.code};${ticket.assigned.name},${ticket.assigned.role.join(',')};${ticket.title};${ticket.estimation};${ticket.status};${ticket.effort?.join(',')};${ticket.parents.join(',')};${ticket.mvp.id},${ticket.mvp.name}`
    );
    return header + '\n' + csv.join('\n');
  }

  set projectValue(v) {
    try {
      this.project = JSON.parse(v);
      this.parseJSONError = false;
    }
    catch(e) {
      this.parseJSONError = true;
    };
  }

  onInsert() {
    // this.onLoad.next(this.project);
    this.projectLoaded = true;
  }

  onClose() {
    this.onCancel.next(false)
  }

  download(data:string, filename:string, type:string) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0);
  }

}
