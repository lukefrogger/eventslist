import { UserApiService } from './../../services/user-api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventsList: Array<object> = [];
  singleEvent = {};
  title = 'This is the title';

  constructor(public authService: AuthService, public userapi: UserApiService) {
    this.getEvents();
   }

  ngOnInit() {
    console.log('on init firing');
  }

  getEvents(){
    this.userapi.getEvents().subscribe(
      (success) => {
        let jsonRes = success.json();
        this.eventsList = JSON.parse(jsonRes.body).records;
        this.singleEvent = this.eventsList[0];
        console.log(this.eventsList);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }

  logout(){
    this.authService.logout();
  }
}
