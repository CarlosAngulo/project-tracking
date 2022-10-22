import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

    credentials = environment.jira;

    constructor(private http: HttpClient) {
    }

    getEpic() {
        console.log(btoa(`${this.credentials.user}:${this.credentials.token}`))
        return this.http.get('https://projects.mbww.com/rest/api/3/issue/AMC-10451', {
            headers: {
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(`${this.credentials.user}:${this.credentials.token}`)
            }
        })
    }
  
}
