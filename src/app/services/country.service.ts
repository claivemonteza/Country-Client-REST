import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/model/country.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }
 
  public addCountry(country: Country):Observable<Country>{
   return this.http.post<Country>(`${this.url}/countries/save`,country);
  }
 
  public updateCountry(country: Country): Observable<Country>{
   return this.http.put<Country>(`${this.url}/countries/update`,country);
  }
 
  public deleteCountry(id):Observable<void>{
   return this.http.delete<void>(`${this.url}/countries/delete/${id}`);
  }
 
  public getCountryByName(name: string): Observable<Country>{
     return this.http
       .get<Country[]>(`${this.url}/countries/find/${name}`)
       .pipe(map(([res]) => res));
   }
 
   public getAllCountries(){
     return this.http.get<Country[]>(`${this.url}/countries`);
   }

   private _listners = new Subject<any>();
   listen():Observable<any>{
     return this._listners.asObservable();
   }
   filter(filterBy:string){
     this._listners.next(filterBy);
   }
}
