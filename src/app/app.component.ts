import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, subscribeOn, switchMap, takeUntil } from 'rxjs';
import { UserService } from './features/users/user.service';
import { IProject } from './interfaces/nodes.inteface';
import { CompanyService } from './services/company/company.service';
import { JiraService } from './services/jira.service';
import { NodeTreeService } from './services/nodetree.service';
import { PeopleService } from './services/people/people.service';
import { FirebaseService } from './services/project-loader/firebase.service';
import { ProjectService } from './services/project-loader/project.service';
import { TicketService } from './services/tickets/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  showProjectLoader = true;
  isDetailPanelOpen = false;
  projects: any[] = [];
  people: any[] = [];
  project!: IProject;
  currentCompanyID = "frCRG0OZ2ytX2GvgYk50";
  private unsub$ = new Subject<void>();
  showAuthentication = false;
  editable = false;

  constructor(
    private nodeTreeService: NodeTreeService,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private peopleService: PeopleService,
    readonly firebaseService: FirebaseService,
    private userService: UserService,
    private jiraService: JiraService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.nodeTreeService.loadFromLocalStorage();

    if (localStorage.getItem('project')) {
      this.showProjectLoader = false;
    }

    this.userService.isProfileOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => this.showAuthentication = res);
  
    this.editable = this.userService.hasSession;
    
    this.userService.hasSession$()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => {
      this.editable = res
    });

    this.jiraService.getEpic()
    .subscribe(console.log)

    // this.companyService.loadCompanies()
    // .pipe(
    //   takeUntil(this.unsub$),
    //   switchMap((companies: any[]) => {
    //     const kinesso = companies.find(company => company.docId === this.currentCompanyID);
    //     // console.log('companies', companies)
    //     return this.companyService.loadCompany(kinesso.docId);
    //   }),
    //   switchMap((company:any) => {
    //     // console.log('company', company)
    //     return this.peopleService.loadPeople(this.companyService.company.people);
    //   }),
    //   switchMap((people:any) => {
    //     // console.log('people', people)
    //     return this.projectService.getProjectsByCompany(this.companyService.company.projects);
    //   })
    // )
    // .subscribe(projects => {
    //   // console.log('company', this.companyService.company);
    //   // console.log('people', this.peopleService.people);
    //   // console.log('res', projects);
    //   this.projects = projects;
    //   this.people = this.peopleService.people;
    // })

    this.nodeTreeService.isLoadWindowOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => this.showProjectLoader = res);

    this.ticketService.isDetailsPanelOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe((res:boolean) => {
      this.isDetailPanelOpen = res;
    });
  }

  loadProject(projectID: string) {
    this.firebaseService.getProject(projectID)
    .pipe(
      switchMap( res => this.projectService.loadProjectData(res))
    )
    .subscribe((project: any) => this.onShowLoader(false))
  }
  
  onShowLoader(event:boolean) {
    this.showProjectLoader = event;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
  
  onCreateNode() {
    this.ticketService.setNodeData();
  }
}
