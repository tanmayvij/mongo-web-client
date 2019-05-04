import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { DatabasesComponent } from './databases/databases.component';
import { CollectionsComponent } from './collections/collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    DatabasesComponent,
    CollectionsComponent,
    ViewCollectionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
