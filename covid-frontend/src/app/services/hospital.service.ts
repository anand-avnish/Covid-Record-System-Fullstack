import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    BASE_URL = environment.SERVER_URL + "/hospital";

    constructor(
        private http: HttpClient
    ){}

    createHospital(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/createHospital', body, httpOptions).toPromise();
    }

    updateHospital(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/updateHospital', body, httpOptions).toPromise();
    }

    removeHospital(filters){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
      };
      const body = JSON.stringify(filters);
      return this.http.post(this.BASE_URL + '/removeHospital', body, httpOptions).toPromise();
    }

    getHospital(){
        return this.http.get(this.BASE_URL + '').toPromise();
    }

    getHospitalById(id){
      let params = new HttpParams().set('id', id);
      return this.http.get(this.BASE_URL + '/getHospitalById', { params }).toPromise();
    }
}
