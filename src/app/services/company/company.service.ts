import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FirebaseService } from '../project-loader/firebase.service';

export interface ICompany {
    id: string;
    name: string;
    people: string[];
    projects: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    _company!: ICompany;

    constructor(private firebaseService: FirebaseService){}

    set companyData(companyData: any) {
        this._company = {
            id: companyData.docId,
            name: companyData.name,
            people: companyData.people.map((person:any) => person.id),
            projects: companyData.projects.map((project:any) =>  project.id)
        }
    }

    get company() {
        return this._company;
    }

    loadCompany(companyID: string): Observable<any> {
        return this.firebaseService.getCompany(companyID)
        .pipe(
            tap((companyData:any) => this.companyData = companyData)
        );
    }
    
    loadCompanies() {
      return this.firebaseService.getCompanies();
    }
}