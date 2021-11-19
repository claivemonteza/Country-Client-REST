import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country.service';
import { AddCountryComponent } from 'src/app/components/add-country/add-country.component';
import { EditCountryComponent } from 'src/app/components/edit-country/edit-country.component';
import { DeleteCountryComponent } from 'src/app/components/delete-country/delete-country.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  source: Country[] = [];
  dataSource: MatTableDataSource<Country>;
  displayedColumns: string[] = ['name', 'capital', 'region', 'subregion', 'area','options'];
  
  constructor(private themeService: ThemeService, private countryService: CountryService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Country>([]);
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.source = data;
      this.dataSource.data = data;
    });
  }
  

  /* Open Dialog box */
  displayDialog(country: Country, mode: string){
    if(mode==='add'){
      this.openDialog(country, AddCountryComponent, '60%');
    }else{
      if(mode==='edit'){
        this.openDialog(country, EditCountryComponent, '60%');
      }
    }
  }

  deleteCountry(event, country: Country, mode: string){
    event.stopPropagation();
    if(mode==='delete'){
    this.openDialog(country, DeleteCountryComponent, '28%');
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

  /* Search*/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filter(filter: string) {
    if(filter === 'All') {
      this.dataSource.data = this.source;
    }else {
      this.dataSource.data = this.source.filter((country) => country.region === filter);
    }
  }

  /* Change theme */
  toogleTheme() {
    this.themeService.toggleMode();
  }
 
}
