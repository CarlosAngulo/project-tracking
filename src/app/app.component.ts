import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProject } from './interfaces/nodes.inteface';
import { NodeTreeService } from './services/nodetree.service';
import { FirebaseService } from './services/project-loader/firebase.service';
import { ProjectService } from './services/project-loader/project.service';
import { TicketService } from './services/tickets/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  showLoader = true;
  isDetailPanelOpen = false;
  projects: any[] = [];
  project!: IProject;
  private unsub$ = new Subject<void>();

  constructor(
    private nodeTreeService: NodeTreeService,
    private ticketService: TicketService,
    private projectService: ProjectService,
    readonly firebaseService: FirebaseService  
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.nodeTreeService.loadFromLocalStorage();

    if (localStorage.getItem('project')) {
      this.showLoader = false;
    }

    this.nodeTreeService.isLoadWindowOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => this.showLoader = res);

    this.ticketService.isDetailsPanelOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe((res:boolean) => {
      this.isDetailPanelOpen = res;
    });

    this.projectService.getProjects()
    .subscribe( projects => {
      this.projects = projects
    })
  }

  loadProject(projectID: string) {
    this.project = this.projects.find(project => project.docId === projectID);
    this.projectService.loadProject(projectID)
    .subscribe(
      (res: any[]) => {
        const project = {
          leader: res[0][0].name,
          name: this.project.name,
          tickets: res[1].flat()
        }
        this.onShowLoader(false);
        this.projectService.project = project;
        this.nodeTreeService.loadProject(project)
        this.onShowLoader(false);
      }
    )
  }
  
  onShowLoader(event:boolean) {
    this.showLoader = event;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
