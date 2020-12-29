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
  collectionname: string;
  newCollectionName: string;

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
    this.http.get<any[]>(`/api/databases/${this.dbname}`, httpOptions).subscribe(data => {
      data.forEach(element => {
        element.editClicked = false;
      });
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

  drop(collection)
  {
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = collection;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    if(confirm("Are you sure you want to drop the entire collection?")) {
      this.http.delete(`/api/databases/${this.dbname}/${this.collectionname}`, httpOptions).subscribe(data => {
        this.ngOnInit();
      }, error => {
        this.message = "Error: " + error.error.error;
      });
    }
  }

  rename(oldName)
  {
    let newName = this.newCollectionName || oldName;
    if(oldName === newName) {
      this.ngOnInit();
      this.newCollectionName = undefined;
      return; // Avoid API call if name not changed
    }
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = oldName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.put(`/api/databases/${this.dbname}/${this.collectionname}`,{ newName }, httpOptions).subscribe(data => {
      this.ngOnInit();
      this.newCollectionName = undefined;
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }

  dropDb()
  {
    this.dbname = this.route.snapshot.params.dbName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    if(confirm("Are you sure you want to drop the entire database?")) {
      this.http.delete(`/api/databases/${this.dbname}`, httpOptions).subscribe(data => {
        this.router.navigate([`/databases`]);
      }, error => {
        this.message = "Error: " + error.error.error;
      });
    }
  }

  onKey(event) {
    this.newCollectionName = event.target.value;
  }
}
