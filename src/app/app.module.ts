import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material/material.module';
import { CountryService } from './services/country.service';
import { FormsModule } from '@angular/forms';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { DeleteCountryComponent } from './components/delete-country/delete-country.component';
import { ExportComponent } from './components/export/export.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditCountryComponent,
    AddCountryComponent,
    DeleteCountryComponent,
    DropdownComponent,
    ExportComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
