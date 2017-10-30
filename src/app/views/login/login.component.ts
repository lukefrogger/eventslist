import { UserApiService } from './../../services/user-api.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public userApi: UserApiService) { }

  ngOnInit() {
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook().then(
      (res) => { 
        this.userApi.signIntoSalesforce(res.email, this.enterApp());
        
        
      })
    .catch((err) => console.log(err));
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(
      (res) => { 
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  enterApp(){
    this.router.navigate(['dashboard']);
  }
  
}
