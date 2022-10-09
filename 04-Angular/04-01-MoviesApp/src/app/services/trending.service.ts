import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AppService } from './app.service';
import { MovieHeaders, MoviesResponse } from './movies.service';

@Injectable()
export class TrendingService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService
  ) { }

  get(mediaType: MediaType, timeWindow: TimeWindow, page?: number): Observable<TrendingResponse> {
    return this._httpClient.get<TrendingResponse>(this._appService.urls.getTrending(MediaType[mediaType], TimeWindow[timeWindow]) + `${page ? "&page=" + page : ""}`).pipe(
      map(data => {
        data.header = MovieHeaders.Trending;
        console.log("Trending", data);
        this._appService.manipulateResponses(data);
        return data;
      })
    )
  }
}

export class TrendingResponse extends MoviesResponse {

}

export enum MediaType {
  All,
  Movie,
  Tv,
  Person
}

export enum TimeWindow {
  Day,
  Week
}