import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
