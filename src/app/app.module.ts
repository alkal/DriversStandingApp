import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatComponentsModule} from '../mat-components/mat-components.module'


import { AppComponent } from './app.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { ErgastApiService } from './ergast-api.service';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { SearchFormComponent } from './search-form/search-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DriversListComponent,
    DriverInfoComponent,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, 
    HttpClientModule, 
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatComponentsModule
  ],
  providers: [
    ErgastApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
