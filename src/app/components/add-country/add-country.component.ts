import { Component, OnInit , Inject} from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  title="Add Country";
  country?:Country;

  constructor(private countryService: CountryService, public dialogRef: MatDialogRef<AddCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country) {
    this.country = data;
  }
  
    ngOnInit(): void {}
  
    onNoClick(): void {
      this.dialogRef.close(AddCountryComponent);
      this.countryService.filter('Add click');
    }
  
    public onAddCountry(addForm: NgForm): void {
      document.getElementById('add-country-form').click();
      this.countryService.addCountry(addForm.value).subscribe(
        (response: Country) => {
          addForm.reset();
          this.onNoClick();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );     
    }
  
}
