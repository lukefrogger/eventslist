import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserApiService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {

  }

  signIntoSalesforce(email, callback){
    console.log(email);
    let params = new URLSearchParams();
    params.set('id', email);
    return this.http.get(`login`, {search:params}).map((response: any) => {
      return response.json();
    })
  }

}
