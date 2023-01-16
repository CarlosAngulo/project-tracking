import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { INode } from 'src/app/interfaces/nodes.inteface';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

export interface GetUSer {
    (user: User | null): void;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    projects!: Observable<any>;

    constructor(private firestore: AngularFirestore){}

    // Authentication
    onUserChanged(callback: GetUSer) {
        return onAuthStateChanged(getAuth(), (user: User | null) => callback(user));
    }

    createUserWithEmailAndPassword(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log('Usuario exitoso: ', response);
        })
        .catch(error => {
            console.log('Error al crear usuario: ', error);
        });
    }

    signInWithEmailAndPassword(email: string, password: string) {
        console.log(email, password)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log('Inicio de sesión exitoso: ', response);
        })
        .catch(error => {
            console.log('Error al iniciar sesión: ', error.message);
        });
    }

    logout() {
        firebase.auth().signOut()
        .then(() => {
            console.log('Cierre de sesión exitoso');
            // Puedes manejar la redirección a una ruta no protegida aquí
        })
        .catch(error => {
            console.log('Error al cerrar sesión: ', error);
        });
    }
    
    // Projects

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
        const chunk = this.sliceIntoChunks(projectIDs, 10);
        return combineLatest(chunk.map(item => this.getProjectsByID(item)))
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
        const chunk = this.sliceIntoChunks(personIDs, 10);
        return combineLatest(chunk.map(item => this.getPeopleByID(item)))
    }

    getPeopleByID(personIDs: string[]) {
        return this.firestore.collection('people', ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in', personIDs)).valueChanges({ idField: 'docId' });
    }

    getPerson(personID: string) {
        return this.firestore.doc(`people/${personID}`).valueChanges();
    }

    // Tickets
    getTickets(ticketIDs: string[]) {
        const chunk = this.sliceIntoChunks(ticketIDs, 10);
        return combineLatest(chunk.map(item => this.getTicketsByID(item)))
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
    deleteParentsOnTickets(ticketIDs: string[], parents: string[]) {
        return combineLatest(ticketIDs.map(ticketID => this.deleteParents(ticketID, parents)))
    }
    
    deleteParents(ticketID: string, parents: string[]) {
        console.log(ticketID, parents)
        return this.firestore.doc(`tickets/${ticketID}`).update({
            parents: firebase.firestore.FieldValue.arrayRemove(...parents)
        })
    }

    updateTicket(ticketID: string | undefined, data: Partial<firebase.firestore.DocumentData>): Promise<any> {
        return this.firestore.collection<DocumentData>('tickets').doc(ticketID).update(data);
    }

    deleteTicketFromProject(ticketRef:DocumentReference<DocumentData>, projectID: string): Promise<any> {
        return this.firestore.doc(`epics/${projectID}`).update({
            tickets: firebase.firestore.FieldValue.arrayRemove(ticketRef)
        })
    }
}
