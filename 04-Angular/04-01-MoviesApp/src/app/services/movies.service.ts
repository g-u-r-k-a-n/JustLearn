import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie';
import { AppService } from './app.service';
import { CastResponse } from './cast.service';

@Injectable()
export class MoviesService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService
  ) {
  }

  geTopRateds(page?: number): Observable<MoviesResponse> {
    return this._httpClient.get<MoviesResponse>(this._appService.urls.topRatedMovies + `${page ? "&page=" + page : ""}`).pipe(
      map(data => {
        data.header = MovieHeaders.TopRated;
        console.log("TopRatedMovies :", data);
        this._appService.manipulateResponses(data);
        return data;
      })
    )
  }

  getPopulars(page?: number): Observable<MoviesResponse> {
    return this._httpClient.get<MoviesResponse>(this._appService.urls.popularMovies + `${page ? "&page=" + page : ""}`).pipe(
      map(data => {
        data.header = MovieHeaders.Popular;
        console.log("PopularMovies :", data);
        this._appService.manipulateResponses(data);
        return data;
      })
    )
  }

  getSimilarsByMovieId(id: number): Observable<MoviesResponse> {
    return this._httpClient.get<MoviesResponse>(this._appService.urls.getSimilarMoviesByMovieId(id)).pipe(
      map(data => {
        const movies = [];
        this._appService.manipulateResponses(data);
        for (let i = 0; i < data.results.length; i++) {
          const movie = data.results[i];
          movies.push(movie);
          if (i == 7) {
            break;
          }
        }
        this._appService.manipulateResponses(data);
        data.results = movies;
        data.header = MovieHeaders.Similar;
        console.log("SimilarMovies", movies);
        return data;
      })
    );
  }

  getByGenreId(id: number, page?: number): Observable<MoviesResponse> {
    return this._httpClient.get<MoviesResponse>(this._appService.urls.getMoviesByGenreId(id) + `${page ? "&page=" + page : ""}`).pipe(
      map(data => {
        console.log("GenreMovies :", data);
        this._appService.manipulateResponses(data);
        return data;
      })
    );
  }

  getByCastId(id: number, page?: number): Observable<CastResponse> {
    return this._httpClient.get<CastResponse>(this._appService.urls.getMoviesByCastId(id) + `${page ? "&page=" + page : ""}`).pipe(
      map(data => {
        console.log("CastMovies :", data);
        this._appService.loadGenres(data.cast);
        return data;
      })
    );
  }

  getById(id: number): Observable<Movie> {
    return this._httpClient.get<Movie>(this._appService.urls.getMovieById(id)).pipe(
      tap(data => {
        console.log("Movie :", data);
      })
    );
  }
}

export class MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  header?: MovieHeaders | string;
}

export enum MovieHeaders {
  Popular = "Popular",
  TopRated = "Top Rated",
  Trending = "Trending",
  Similar = "Similar"
}