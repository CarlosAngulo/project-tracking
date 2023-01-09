import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { IPerson } from 'src/app/interfaces/nodes.inteface';
import { FirebaseService } from '../project-loader/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private _peopleIDs!: string[];
  private _people!: IPerson[];
  private _peopleRefs!: any[];

  constructor(private firebaseService: FirebaseService){}

  set people(people: any[]) {
    this._peopleIDs = people.map(ref => ref.id);
    this._people = people
    .filter(person => person.active === true)
    .map(person => ({
      id: person.docId,
      name: person.name,
      roles: person.roles || [],
    }))
  }

  get people(): IPerson[] {
    return this._people;
  }

  getPerson(personID?: string) {
    if (personID === undefined) return '--';
    return this._people.find(person => person.id === personID);
  }
  
  getPersonRef(personID?: string) {
    if (personID === undefined) return '--';
    return this._peopleRefs.find(personRef => personRef.docId === personID);
  }
  
  loadPeople(peopleIDs: string[]): Observable<any> {
    this._peopleIDs = peopleIDs;
    this._peopleRefs
    return this.firebaseService.getPeople(peopleIDs)
    .pipe(
      map(res => {
        this.people = res.flat();
        return res.flat();
      })
    );
  }
}