import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PatientService {
    BASE_URL = environment.SERVER_URL + "/patient";

    constructor(
        private http: HttpClient
    ){}

    createPatient(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/createFullPatient', body, httpOptions).toPromise();
    }

    updatePatient(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/updatePatient', body, httpOptions).toPromise();
    }

    removePatient(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/removePatient', body, httpOptions).toPromise();
    }

    getPatient(){
        return this.http.get(this.BASE_URL + '').toPromise();
    }

    getPatientById(id){
        let params = new HttpParams().set('id', id);
        return this.http.get(this.BASE_URL + '/getPatientById', { params }).toPromise();
    }
}
