import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Country } from '../../model/Country.model';
import { CountryService } from 'src/app/services/country.service';
import { AddCountryComponent } from 'src/app/components/add-country/add-country.component';
import { EditCountryComponent } from 'src/app/components/edit-country/edit-country.component';
import { DeleteCountryComponent } from 'src/app/components/delete-country/delete-country.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {


  dataSource: MatTableDataSource<Country>;
  listCountry:any;
  displayedColumns: string[] = ['name', 'capital', 'region', 'subregion', 'area','options'];
 
  @ViewChild(MatSort) sort: MatSort;
  static dataSource: any;
  
  constructor(private countryService: CountryService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Country>([]);
    this.countryService.listen().subscribe((m:any)=>{
      this.countries();
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.countries();
  }
  
  displayDialog(country: Country, mode: string){
    if(mode==='add'){
      this.openDialog(country, AddCountryComponent, '60%');
    }else{
      if(mode==='edit'){
        this.openDialog(country, EditCountryComponent, '60%');
      }else{
        this.openDialog(country, DeleteCountryComponent, '28%');
      }
    }
  }

  openDialog(country, component, percentage:string ) {
    this.dialog.open(component, {
      autoFocus: false,
      panelClass: 'app-dialog',
      width: percentage,
      data: country
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  countries(){
    this.countryService.getAllCountries().subscribe(data => {
      this.dataSource.data = data;
    });
  }
 
   static setDataSource(data:Country[]){
     this.dataSource.data = data;
  }
}
