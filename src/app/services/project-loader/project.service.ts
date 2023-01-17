import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { combineLatest, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { INode, IProject, IRawProject } from 'src/app/interfaces/nodes.inteface';
import { NodeTreeService } from '../nodetree.service';
import { PeopleService } from '../people/people.service';
import { FirebaseService } from './firebase.service';


export interface IProjectCreateDTO {
    leader: string;
    name: string;
    private: boolean,
    tickets?: []
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    private currentProject!: IProject;
    private _project: Subject<IProject> = new Subject();
    private project$: Observable<IProject> = this._project.asObservable();

    projects!: any[];
    private _projects: Subject<any[]> = new Subject();
    private projects$: Observable<any[]> = this._projects.asObservable();

    private _ticketsRef!: DocumentReference[];

    constructor(
        readonly firebaseService: FirebaseService,
        private nodeTreeService: NodeTreeService,
        private peopleService: PeopleService
    ){}

    set project(project: IProject) {
        this._project.next(project);
        this.currentProject = project;
    }

    get project(): IProject {
        return this.currentProject;
    }

    get ticketsRef(): DocumentReference<DocumentData>[] {
        return this._ticketsRef;
    }

    createProject(project: IProjectCreateDTO, companyID: string) {
        return this.firebaseService.createProject({
            ...project,
            tickets: [],
        }, companyID);
    }

    getTicketRefById(ticketID:string): DocumentReference<DocumentData> | undefined {
        return this._ticketsRef.find(ticketRef => ticketRef.id === ticketID);
    }

    getProject(): Observable<IProject> {
        return this.project$;
    }

    getProjectsByCompany(companyIDs: string[]) {
        return this.firebaseService.getProjecsByCompany(companyIDs)
        .pipe(
            map( projects => projects.flat()),
            tap( projects => {
                this.projects = projects;
                this._projects.next(projects)
            })
        )
    }

    getProjects(): Observable<any[]>{
        return this.projects$;
    }
    
    getProjectsByID(projectIDs:string[]): Observable<any[]>{
        return this.projects$;
    }

    getCurrentProject$(): Observable<IProject> {
        return this.project$;
    }

    loadProjectData(project: IRawProject) {
        this._ticketsRef = project?.tickets || [];
        return combineLatest([
          this.firebaseService.getPeopleByID([project.leader]),
          this.firebaseService.getTickets(this._ticketsRef.map(ticket => ticket.id))
        ])
        .pipe(
            map( res => {
                const projectSetup = {
                    leader: 'res[0][0].name',
                    docId: project.docId,
                    name: project.name,
                    tickets: res[1].flat()
                }
                this.nodeTreeService.loadProject(projectSetup, this.peopleService.people)
                this.project = {
                    ...projectSetup,
                    tickets: this.nodeTreeService.getStaticNodeTree()
                };
                return this.project
            })
        );
    }

    moveTicketToTrash(ticketRef: DocumentReference<DocumentData> | undefined) {
        if (ticketRef === undefined) return of({});
        return this.firebaseService.moveToTrash(ticketRef, this.project.docId)
        .then( res => this.firebaseService.deleteTicketFromProject(ticketRef, this.project.docId));
    }

    // restoreFromTrash(ticketRef: DocumentReference<DocumentData> | undefined) {
    //     if (ticketRef === undefined) return of({});
    // }
}