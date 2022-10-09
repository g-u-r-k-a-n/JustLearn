import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Genre } from '../models/genre';
import { AppService } from './app.service';

class GenreResponse {
  genres: Genre[];
}

@Injectable()
export class GenresService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService) {
  }

  getAll(): Observable<Genre[]> {
    return this._httpClient.get<GenreResponse>(this._appService.urls.genres).pipe(
      map(data => {
        AppService.genres = data.genres;
        return data.genres;
      })
    );
  }

  getByIds(ids: number[]): Genre[] {
    const selectedGenres: Genre[] = [];
    for (const id of ids) {
      selectedGenres.push(AppService.genres?.find(g => g.id === id));
    }
    return selectedGenres;
  }

  getById(id: number): Genre {
    return AppService.genres.find(g => g.id === id);
  }
}
