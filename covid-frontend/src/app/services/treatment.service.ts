import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TreatmentService {
    BASE_URL = environment.SERVER_URL + "/treatment";

    constructor(
        private http: HttpClient
    ){}

    createTreatment(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/createTreatment', body, httpOptions).toPromise();
    }

    updateTreatment(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/updateTreatment', body, httpOptions).toPromise();
    }

    removeTreatment(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/removeTreatment', body, httpOptions).toPromise();
    }

    getTreatment(){
        return this.http.get(this.BASE_URL + '').toPromise();
    }

    getTreatmentById(body){
      let params = new HttpParams()
        .set('patient_id', body.patient_id)
        .set('hospital_id', body.hospital_id);
      return this.http.get(this.BASE_URL + '/getTreatmentById', { params }).toPromise();
    }
}
