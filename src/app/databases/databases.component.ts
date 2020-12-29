import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {
  databases: any;
  message: string = "Loading...";
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm = fb.group({
      'name': ['']
    });
  }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.get("/api/databases", httpOptions).subscribe(data => {
      this.databases = data;
      this.message = "";
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }
  
  createDB()
  {
    this.router.navigate(['/databases/' + this.createForm.controls.name.value]);
  }

  drop(db)
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    if(confirm("Are you sure you want to drop the entire database?")) {
      this.http.delete(`/api/databases/${db}`, httpOptions).subscribe(data => {
        this.ngOnInit();
      }, error => {
        this.message = "Error: " + error.error.error;
      });
    }
  }

  rename(oldName, newName) {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.put(`/api/databases/${oldName}`,{ newName }, httpOptions).subscribe(data => {
      this.ngOnInit();
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }

}
