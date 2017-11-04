import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

  geoData;
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  apiUrl = 'http://192.168.1.176:3000/';
  //apiUrl = 'http://54.198.139.141/';
  transactions;
  currentCandidates;
  location;

 constructor(private http: Http) {

 }

  getData(): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});
  return this.http.get(this.apiUrl, options).toPromise()
   .then(response => this.geoData = response.json())
   .catch(this.handleError)
  }

  getCandidates(location): Promise<Object> {
      console.log(location)
   let options = new RequestOptions({ headers: this.headers});
    let candidateUrl = this.apiUrl + 'candidates/'

  return this.http.post(candidateUrl, location, options).toPromise()
   .then(response => {
       this.geoData = response.json();
       this.currentCandidates = response.json();
       console.log(this.currentCandidates)
   })
   .catch(this.handleError)
 }

  getCandidateById(candidate_id): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});
   let candidateUrl = this.apiUrl + 'candidates/' + candidate_id;

  return this.http.get(candidateUrl, options).toPromise()
   .then(response => this.geoData = response.json())
   .catch(this.handleError)
 }

  getTransactions(search_query): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});


   //let candidateUrl = this.apiUrl + 'candidates/';
    let transactionUrl = 'http://54.198.139.141/transactions/'

    let search_query = {
      type: 'expense',
      point: {
        'latitude': 39.9352144,
        'longitude': -75.1720487
      },
      search_distance: 1
    };

    console.log(search_query)


  return this.http.post(transactionUrl, search_query, options).toPromise()
   .then(response => {
     this.transactions = response.json().transactions;
     //this.geoData = response.json()
   })
   .catch(this.handleError)
 }

  getEntityById(entity_id): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});
    let entityUrl = this.apiUrl + 'entities/' + entity_id;

  return this.http.get(entityUrl, options).toPromise()
   .then(response => this.geoData = response.json())
   .catch(this.handleError)
 }


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
 }
}
