import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var M: any;

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  connectForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.connectForm = fb.group({
      'host': ['', Validators.required],
      'port': [, Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'authdb': ['', Validators.required],
      'srv': []
    });
   }

  ngOnInit() {
    if(sessionStorage.token)
      this.router.navigate(['/dashboard']);
  }
  connect()
  {
    
    if(this.connectForm.controls.host.errors ||
      this.connectForm.controls.port.errors ||
      this.connectForm.controls.username.errors ||
      this.connectForm.controls.password.errors ||
      this.connectForm.controls.authdb.errors)
    { 
      M.toast({html: "Error: All fields are required.", displayLength: 2000});
    }
    else {
      this.http.post('http://localhost/api/auth/connect', this.connectForm.value).subscribe(data => {
        sessionStorage.token = data['token'];
        sessionStorage.host = data['host'];
        sessionStorage.port = data['port'];
        sessionStorage.username = data['username'];
        sessionStorage.authdb = data['authdb'];
        this.router.navigate(['/dashboard']);
      },
      error => M.toast({html: error.error.errorMsg}));
    }
  }
}
