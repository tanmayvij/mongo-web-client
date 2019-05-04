import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatabasesComponent } from './databases/databases.component';
import { CollectionsComponent } from './collections/collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';

const routes: Routes = [
  {
    path: '',
    component: sessionStorage.token == null ? ConnectComponent : DashboardComponent
  },
  {
    path: 'databases',
    component: DatabasesComponent
  },
  {
    path: 'databases/:dbName',
    component: CollectionsComponent
  },
  {
    path: 'databases/:dbName/:collectionName',
    component: ViewCollectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
