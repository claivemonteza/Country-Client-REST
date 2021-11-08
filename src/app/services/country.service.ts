import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/model/country.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url = `${environment.api}`;

  constructor(private http: HttpClient) { }
 
  public addCountry(country: Country):Observable<Country>{
   return this.http.post<Country>(`${this.url}/save`,country);
  }
 
  public updateCountry(country: any, id:number): Observable<Country>{
   return this.http.put<Country>(`${this.url}/update/${id}`,country);
  }
 
  public deleteCountry(id:number):Observable<any>{
   return this.http.delete(`${this.url}/delete/${id}`);
  }
 
  public getCountryByName(name: string): Observable<Country>{
     return this.http
       .get<Country[]>(`${this.url}/find/${name}`)
       .pipe(map(([res]) => res));
   }
 
   public getAllCountries(){
     return this.http.get<Country[]>(`${this.url}`);
   }

   private _listners = new Subject<any>();
   listen():Observable<any>{
     return this._listners.asObservable();
   }
   filter(filterBy:string){
     this._listners.next(filterBy);
   }
}
