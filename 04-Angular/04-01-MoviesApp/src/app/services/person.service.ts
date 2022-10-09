import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person } from '../models/person';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService
  ) { }

  getById(personId: number): Observable<Person> {
    return this._httpClient.get<Person>(this._appService.urls.getPersonById(personId)).pipe(
      tap(data => {
        if (!data.deathday) {
          Object.defineProperty(data, "age", {
            value: new Date().getFullYear() - new Date(data.birthday)?.getFullYear(),
            writable: false
          });
        }
        console.log("Person :", data);
        return data;
      })
    )
  }
}
