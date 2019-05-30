import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections: any;
  message: string = "Loading...";
  dbname: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    if(sessionStorage.token == null)
      this.router.navigate(['/']);

    this.dbname = this.route.snapshot.params.dbName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.http.get(`http://localhost:8080/api/databases/${this.dbname}`, httpOptions).subscribe(data => {
      this.collections = data;
      console.log(data)
      this.message = "";
    }, error => {
      this.message = "Error: " + error.error.error;
    });
  }

}
