import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Person } from '../models/person';
import { AppService } from './app.service';

@Injectable()
export class CastService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService
  ) { }

  getByMovieId(id: number): Observable<CastResponse> {
    return this._httpClient.get<CastResponse>(this._appService.urls.getCastByMovieId(id)).pipe(
      map(data => {
        const persons = [];
        for (let i = 0; i < data.cast.length; i++) {
          const person = data.cast[i];
          persons.push(person);
          if (i == 3) {
            break;
          }
        }
        data.cast = persons;
        console.log("Cast", persons);
        return data;
      })
    );
  }
}

export class CastResponse {
  cast: Person[];
}
