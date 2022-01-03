import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CovidService {
    BASE_URL = environment.SERVER_URL + "/hospital";

    constructor(
        private http: HttpClient
    ){}

    covidRecord(){
      const httpOptions = {
          params: new HttpParams().set('country','INDIA'),
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'b5b4d5c269msh7cc78f64e132e26p18e968jsnab83a58155ae'
          })
      };
      return this.http.get('https://covid-193.p.rapidapi.com/statistics', httpOptions).toPromise();
    }

    // getHospital(){
    //     return this.http.get(this.BASE_URL + '').toPromise();
    // }

    // getCandidateById(id){
    //     let params = new HttpParams().set('id', id);
    //     return this.http.get(this.BASE_URL + '/getCandidateById', { params }).toPromise();
    // }
}
