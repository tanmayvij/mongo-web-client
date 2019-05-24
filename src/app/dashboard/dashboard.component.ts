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
    this.time = '';
  }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);
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
