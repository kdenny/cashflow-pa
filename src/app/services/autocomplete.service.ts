import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class AutocompleteService {

  geoData;
  private headers = new Headers({'Content-Type': 'application/json'});
  //apiUrl = 'http://127.0.0.1:8000/geo/';
  apiUrl = 'http://54.198.139.141/';

 constructor(private http: Http) {
 }

  getEntitySearch(text): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});
    let searchUrl = this.apiUrl + '/entities/search/' + text;
  return this.http.get(searchUrl, options).toPromise()
   .then(response => this.geoData = response.json())
   .catch(this.handleError)
  }

  getTransactionSearch(text): Promise<Object> {
   let options = new RequestOptions({ headers: this.headers});
    let searchUrl = this.apiUrl + '/transaction/search/' + text;
  return this.http.get(searchUrl, options).toPromise()
   .then(response => this.geoData = response.json())
   .catch(this.handleError)
  }


 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
 }
}
