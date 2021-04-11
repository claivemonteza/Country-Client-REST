import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../model/Country.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url=environment.apiUrl;

  constructor(private http: HttpClient) { }
 
  public addCountry(country: Country):Observable<Country>{
   return this.http.post<Country>(`${this.url}/country/add`,country);
  }
 
  public updateCountry(country: Country): Observable<Country>{
   return this.http.put<Country>(`${this.url}/country/update`,country);
  }
 
  public deleteCountry(id):Observable<void>{
   return this.http.delete<void>(`${this.url}/country/delete/${id}`);
  }
 
  public getCountryByName(name: string): Observable<Country>{
     return this.http
       .get<Country[]>(`${this.url}/country/name/${name}`)
       .pipe(map(([res]) => res));
   }
 
   public getAllCountries(){
     return this.http.get<Country[]>(`${this.url}/country/all`);
   }
}
