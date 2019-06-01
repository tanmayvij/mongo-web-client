import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  message: string = "Loading...";
  dbname: string;
  collectionname: string;
  documents: any;
  isEdit: any = {};
  isView: any = {};
  updateForm: FormGroup;
  insertForm: FormGroup;
  insertClicked: boolean = false;
  tempDoc: any = {};

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.updateForm = fb.group({
        'document': ['']
      });
      this.insertForm = fb.group({
        'document': ['']
      });
    }

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
      this.message = "";
      this.documents = data;
      for(let doc of this.documents)
      {
        this.isView[doc._id] = false;
        this.isEdit[doc._id] = false;
      }
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
  syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'darkorange';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'red';
            } else {
                cls = 'green';
            }
        } else if (/true|false/.test(match)) {
            cls = 'blue';
        } else if (/null/.test(match)) {
            cls = 'magenta';
        }
        return '<span style="color:' + cls + '">' + match + '</span>';
    });
  }
  toStr(obj, Case)
  {
    var str = JSON.stringify(obj, undefined, 4);
    if(Case == 0)
    {
      str = this.syntaxHighlight(str);
      return str.length > 500 ? str.substring(0, 500) + '...' : str;
    }
    else if(Case == 1)
      return this.syntaxHighlight(str);
    else if(Case==2)
    {
      str=JSON.stringify(obj);
      let temp = JSON.parse(str);
      delete temp['_id'];
      str = JSON.stringify(temp, undefined, 4);
      return str;
    }
  }
  expandToggle(id)
  {
    this.isEdit[id] = false;
    this.isView[id] = this.isView[id] == true ? false : true;
  }
  editToggle(doc)
  {
    this.isView[doc._id] = false;
    if(this.isEdit[doc._id] == true)
    {
      this.isEdit[doc._id] = false;
    }
    else {
      this.isEdit[doc._id] = true;
      // Hide all other edit windows
      for(let i in this.isEdit)
      {
        if(i!=doc._id)
          this.isEdit[i] = false;
      }
      this.tempDoc = this.toStr(doc,2);
    }
  }
  delete(id)
  {
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = this.route.snapshot.params.collectionName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    this.message = "Deleting..."
    this.http.delete(`http://localhost:8080/api/databases/${this.dbname}/${this.collectionname}/${id}`,
      httpOptions)
      .subscribe(data => {
        this.ngOnInit();
        M.toast({html: "Deleted successfully."});
      }, error => {
        this.message = "";
        M.toast({html: "Error: "+ error.error.error});
      });
  }
  update(id)
  {
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = this.route.snapshot.params.collectionName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    let url = `http://localhost:8080/api/databases/${this.dbname}/${this.collectionname}/${id}`;
    console.log(url, this.updateForm.value);
    this.http.put(url, this.updateForm.value, httpOptions).subscribe(data => {
      M.toast({html: "Saved successfully."});
      this.ngOnInit();
    }, error => {
      this.message = "";
      console.log(error);
      M.toast({html: "Error: "+ error.error.error});
    });
  }
  insert()
  {
    this.insertClicked = false;
    this.dbname = this.route.snapshot.params.dbName;
    this.collectionname = this.route.snapshot.params.collectionName;
    let httpOptions = {
      headers: new HttpHeaders({
        'token': sessionStorage.token
      })
    };
    let url = `http://localhost:8080/api/databases/${this.dbname}/${this.collectionname}`;
    this.http.post(url, this.insertForm.value, httpOptions).subscribe(data => {
      this.ngOnInit();
      M.toast({html: "Inserted successfully."});
      this.insertForm.reset();
    }, error => {
      this.message = "";
      M.toast({html: "Error: "+ error.error.error});
    });
  }
}
