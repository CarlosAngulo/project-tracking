import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { INode, IProject } from 'src/app/interfaces/nodes.inteface';
import { FirebaseService } from './firebase.service';

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

    constructor(
        readonly firebaseService: FirebaseService  
    ){
        this.loadProjects();
    }

    set project(project: IProject) {
        this._project.next(project);
        this.currentProject = project;
    }

    get project(): IProject {
        return this.currentProject;
    }

    getProject(): Observable<IProject> {
        return this.project$;
    }

    loadProjects() {
        this.firebaseService.getProjects()
        .subscribe((projects) => {
            this.projects = projects;
            this._projects.next(projects);
        });
    }

    getProjects(): Observable<any[]>{
        return this.projects$;
    }

    getCurrentProject$(): Observable<IProject> {
        return this.project$;
    }

    loadProject(projectID: string) {
        const projectData = this.projects.find(project => project.docId === projectID);
        const tickets: INode[] = projectData?.tickets || [];
        return combineLatest([
          this.firebaseService.getPeopleByID([projectData.assigned.id]),
          this.firebaseService.getTicketsChunk(tickets.map(ticket => ticket.id))
        ]);
    }
}