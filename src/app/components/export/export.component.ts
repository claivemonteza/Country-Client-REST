import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Country } from '../../model/Country.model';

import { CountryService } from '../../services/country.service';
import { ExporterService } from '../../services/exporter.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit{
  options: Country[];
  showOptions = false;

  constructor(private service: CountryService, private exporterService: ExporterService) {
    this.options=[];
  }

  ngOnInit(){
    this.service.getAllCountries().subscribe(data => {
      this.options= data as Country[];
    });
  }
  
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.options, 'REST_Countries-XLSX');
  }

  exportAsCSV(): void {
    this.exporterService.exportToCSV(this.options, 'REST_Countries-CSV');
  }

  exportAsXML(): void {
    this.exporterService.exportToXML(this.options, 'REST_Countries-XML');
  }
}
