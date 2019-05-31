import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  message: string = "Loading...";
  dbname: string;
  collectionname: string;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = this.route.snapshot.params.collectionName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.get(`http://localhost:8080/api/databases/${this.dbname}/${this.collectionname}`, httpOptions).subscribe(data => {
      this.message = JSON.stringify(data);
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }
  drop()
  {
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = this.route.snapshot.params.collectionName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    if(confirm("Are you sure you want to drop the entire collection?")) {
      this.http.delete(`http://localhost:8080/api/databases/${this.dbname}/${this.collectionname}`, httpOptions).subscribe(data => {
        this.router.navigate([`/databases/${this.dbname}`]);
      }, error => {
        this.message = "Error: " + error.error.error;
      });
    }
  }
}
