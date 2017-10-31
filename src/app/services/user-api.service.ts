import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserApiService {

  public userAccessToken: String = '';

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {

  }

  signIntoSalesforce(email){
    console.log(email);
    let params = new URLSearchParams();
    params.set('id', email);
    return this.http.post(`login`, params, this.options).map((response: any) => {
      return response;
    })
  }

}
