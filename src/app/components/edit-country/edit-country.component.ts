import { Component, OnInit, Inject } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

  title = "Modify Country";
  public editCountry: Country;

  constructor(private countryService: CountryService, public dialogRef: MatDialogRef<EditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country) {
    this.editCountry = data;
  }

  ngOnInit(): void { }

  cancel(): void {
    this.dialogRef.close(EditCountryComponent);
    this.countryService.filter('Modify click');
  }

  public onUpdateCountry(country: Country): void {
    this.countryService.updateCountry(country, country.id).subscribe(
      (response: Country) => {
        this.cancel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
