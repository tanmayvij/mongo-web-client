import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
  entryComponents: [DashboardComponent]
})
export class ConnectComponent implements OnInit {
  connectForm: FormGroup;
  postData: any = {

  };
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.connectForm = fb.group({
      'host': [],
      'port': [],
      'username': [],
      'password': [],
      'authdb': [],
      'srv': [],
    });
   }

  ngOnInit() {
  }
  connect()
  {
    //this.http.post('/api/auth/connect', this.postData).subscribe(data => {
      sessionStorage.token = 'token';
    //  sessionStorage.host = data['host'];
    //  sessionStorage.port = data['port'];
    //  sessionStorage.username = data['username'];
    //  sessionStorage.authdb = data['authdb'];
      this.router.config.unshift({'path': '', 'component':  DashboardComponent });
      console.log(this.router.config);
      this.router.navigateByUrl('/rf', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/"])); 
    //});
  }
}
