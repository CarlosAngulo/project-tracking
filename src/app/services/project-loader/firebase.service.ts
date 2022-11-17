import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    projects!: Observable<any>;

    constructor(
        private firestore: AngularFirestore
    ){
        this.projects = firestore.collection('epics').valueChanges();
    }

    getProjects(): Observable<any> {
        return this.projects;
    }

    getPeople(): Observable<any> {
        return this.firestore.collection('people').valueChanges();
    }

    getPerson(personId: string) {
        // this.firestore.collection.where(this.firestore. FieldPath.documentId(), 'in', ["123","456","789"])
        return this.firestore.doc(`people/${personId}`).valueChanges();
    }
  
}
