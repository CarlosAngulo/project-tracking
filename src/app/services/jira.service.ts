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
        return this.http.get('https://carlosangulo.atlassian.net/rest/api/3/issue/PROY-3', {
            headers: {
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(`${this.credentials.user}:${this.credentials.token}`)
                // 'Authorization': 'Basic Y2FybG9zYWxiZXJ0b2FuZ3Vsb21lbmRvemFAZ21haWwuY29tOnBnTEllZmJLbGZTQzZTdThrWnZtODFDRg=='
            }
        })
    }
  
}
