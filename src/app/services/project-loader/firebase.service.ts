import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { combineLatest, Observable } from 'rxjs';
import { INode } from 'src/app/interfaces/nodes.inteface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    projects!: Observable<any>;

    constructor(private firestore: AngularFirestore){}

    getProjects(): Observable<any> {
        return this.firestore.collection('epics').valueChanges({ idField: 'docId' });
    }
    
    getProject(projectID: string): Observable<any> {
        return this.firestore.doc(`epics/${projectID}`).valueChanges();
    }

    addTicketsToProject(projectID: string, tickets: string[]): Promise<any> {
        return this.firestore.doc(`epics/${projectID}`).update({tickets})
    }
    // People
    getPeople(): Observable<any> {
        return this.firestore.collection('people').valueChanges();
    }

    getPeopleByID(personIDs: string[]) {
        return this.firestore.collection('people', ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in', personIDs)).valueChanges({ idField: 'docId' });
    }

    getPerson(personID: string) {
        return this.firestore.doc(`people/${personID}`).valueChanges();
    }

    // Tickets
    getTicketsChunk(ticketIDs: string[]) {
        const chunks = this.sliceIntoChunks(ticketIDs, 10);
        return combineLatest(chunks.map(chunk => this.getTicketsByID(chunk)))
    }

    getTicketsByID(ticketIDs: string[]) {
        return this.firestore.collection<INode>('tickets', ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in', ticketIDs)).valueChanges({ idField: 'id'});
    }
    
    getTicket(ticketID: string) {
        return this.firestore.doc(`tickets/${ticketID}`).valueChanges();
    }

    createTicket(node: INode): Promise<DocumentReference<DocumentData>> {
        return this.firestore.collection<DocumentData>('tickets').add(node);
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
  
    // https://console.firebase.google.com/project/kinesso-project-tracking/firestore/data/~2Fpeople~2F8GjRLn6nSHTCtnzpO6j4?hl=es-419
    // https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
    // https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase#10
    // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    // https://www.makeuseof.com/angular-firebase-complex-queries/
    // https://www.bezkoder.com/angular-10-firestore-crud-angularfire/

}
