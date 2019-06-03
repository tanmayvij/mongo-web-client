import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections: any;
  message: string = "Loading...";
  dbname: string = "";
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
      this.createForm = fb.group({
        'name': ['']
      });
    }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    this.dbname = this.route.snapshot.params.dbName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.get(`/api/databases/${this.dbname}`, httpOptions).subscribe(data => {
      this.collections = data;
      this.message = "";
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }

  createCollection()
  {
    this.dbname = this.route.snapshot.params.dbName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.message = "Creating..."
    this.http.post(`/api/databases/${this.dbname}`, {'collection': this.createForm.controls.name.value}, httpOptions).subscribe(data => {
      this.ngOnInit();
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }
}
