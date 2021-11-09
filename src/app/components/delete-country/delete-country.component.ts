import { Component, OnInit, Inject } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.scss'],
})
export class DeleteCountryComponent implements OnInit {
  title = 'Delete Country';
  country?: Country;

  constructor(
    private countryService: CountryService,
    public dialogRef: MatDialogRef<DeleteCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country
  ) {
    this.country = data;
  }

  ngOnInit(): void {}

  cancel(): void {
    this.countryService.filter('Delete click');
    this.dialogRef.close(DeleteCountryComponent);
  }

  delete(id: number) {
    this.countryService.deleteCountry(id).subscribe(
      (response: void) => {
        this.cancel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.cancel();
      }
    );
  }
}
