import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { DatabasesComponent } from './databases/databases.component';
import { CollectionsComponent } from './collections/collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    DatabasesComponent,
    CollectionsComponent,
    ViewCollectionComponent,
    DashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
