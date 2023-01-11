import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { combineLatest, forkJoin, Observable, switchMap } from 'rxjs';
import { INode } from 'src/app/interfaces/nodes.inteface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    projects!: Observable<any>;

    constructor(private firestore: AngularFirestore){}

    getAllProjects(): Observable<any> {
        return this.firestore.collection('epics').valueChanges({ idField: 'docId' });
    }
    
    getProject(projectID: string): Observable<any> {
        return this.firestore.doc(`epics/${projectID}`).valueChanges({ idField: 'docId' });
    }

    getProjectsByID(projectIDs: string[]) {
        return this.firestore.collection('epics', ref => ref
            .where( firebase.firestore.FieldPath.documentId() , 'in', projectIDs))
            .valueChanges({ idField: 'docId' }
        );
    }

    getProjecsByCompany(projectIDs: string[]) {
        const chunks = this.sliceIntoChunks(projectIDs, 10);
        return combineLatest(chunks.map(chunk => this.getProjectsByID(chunk)))
    }

    addTicketsToProject(projectID: string, tickets: string[]): Promise<any> {
        return this.firestore.doc(`epics/${projectID}`).update({tickets})
    }
    
    addTicketToProject(projectID: string, ticket: DocumentReference): Promise<any> {
        return this.firestore.doc(`epics/${projectID}`).update({
            tickets: firebase.firestore.FieldValue.arrayUnion(ticket)
        })
    }

    // Company
    getCompanies() {
        return this.firestore.collection('companies').valueChanges({ idField: 'docId' });
    }
    
    getCompany(companyID:string) {
        return this.firestore.doc(`companies/${companyID}`).valueChanges({ idField: 'docId' });
    }
    // People
    getPeople(personIDs: string[]) {
        const chunks = this.sliceIntoChunks(personIDs, 10);
        return combineLatest(chunks.map(chunk => this.getPeopleByID(chunk)))
    }

    getPeopleByID(personIDs: string[]) {
        return this.firestore.collection('people', ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in', personIDs)).valueChanges({ idField: 'docId' });
    }

    getPerson(personID: string) {
        return this.firestore.doc(`people/${personID}`).valueChanges();
    }

    // Tickets
    getTickets(ticketIDs: string[]) {
        const chunks = this.sliceIntoChunks(ticketIDs, 10);
        return combineLatest(chunks.map(chunk => this.getTicketsByID(chunk)))
    }

    getTicketsByID(ticketIDs: string[]) {
        return this.firestore.collection<INode>('tickets', ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in', ticketIDs)).valueChanges({ idField: 'id'});
    }
    
    getTicket(ticketID: string) {
        return this.firestore.doc(`tickets/${ticketID}`).valueChanges();
    }

    createTicket(node: INode, projectID: string): Promise<any> {
        return this.firestore.collection<DocumentData>('tickets').add(node)
        .then(
            (res:any) => {
                return this.addTicketToProject(projectID, res)
            }
        );
    }

    sliceIntoChunks(arr:any[], chunkSize :number):any[] {
        const res = [];
        while (arr.length > 0) {
            const chunk = arr.splice(0, chunkSize);
            res.push(chunk);
        }
        return res;
    }

    //Update Ticket
    updateTicket(ticketID: string | undefined, data: Partial<firebase.firestore.DocumentData>): Promise<any> {
        return this.firestore.collection<DocumentData>('tickets').doc(ticketID).update(data);
    }

    deleteTicketFromProject(ticketRef:DocumentReference<DocumentData>, projectID: string): Promise<any> {
        console.log(ticketRef, projectID)
        return this.firestore.doc(`epics/${projectID}`).update({
            tickets: firebase.firestore.FieldValue.arrayRemove(ticketRef)
        })
    }
  
    // https://console.firebase.google.com/project/kinesso-project-tracking/firestore/data/~2Fpeople~2F8GjRLn6nSHTCtnzpO6j4?hl=es-419
    // https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
    // https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase#10
    // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    // https://www.makeuseof.com/angular-firebase-complex-queries/
    // https://www.bezkoder.com/angular-10-firestore-crud-angularfire/

}
