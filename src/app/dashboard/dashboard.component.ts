import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  host: String = "";
  port: Number;
  username: String = "";
  authdb: String = "";
  time: String = "";
  constructor(private router: Router) {
    this.host = sessionStorage.host;
    this.port = sessionStorage.port;
    this.username = sessionStorage.username;
    this.authdb = sessionStorage.authdb;
  }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    let date = new Date();
    let seconds = (date.getTime() - sessionStorage.timestamp) / 1000;
    let mins = Math.floor(seconds/60);
    let secs = Math.floor(seconds%60);
    let secString = secs < 10 ? '0' + secs : secs;
    this.time = `${mins}:${secString}`;
    var _this = this;
    setInterval(function () {
      seconds++;
      let mins = Math.floor(seconds/60);
      let secs = Math.floor(seconds%60);
      let secString = secs < 10 ? '0' + secs : secs;
      _this.time = `${mins}:${secString}`;
    }, 1000);
  }
  logout()
  {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  view()
  {
    this.router.navigate(['/databases']);
  }
}
