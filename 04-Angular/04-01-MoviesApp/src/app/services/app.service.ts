import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { MoviesResponse } from './movies.service';
import { TrendingResponse } from './trending.service';

declare var bootstrap: any;

@Injectable()
export class AppService {

  constructor(
    private readonly _router: Router
  ) {
    this.urls = new Urls();
  }

  urls: Urls;
  static genres: Genre[];
  private tooltipList = new Array<any>();

  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  manipulateResponses(data: MoviesResponse | TrendingResponse) {
    this.loadGenres(data.results);
    this.reducePageCounts(data);
  }

  enableTooltip() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipListNewTooltips = tooltipTriggerList.map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    this.tooltipList.push(...tooltipListNewTooltips);
  }

  hideAllTooltips() {
    this.tooltipList;
    for (const tooltip of this.tooltipList) {
      tooltip.dispose();
    }
    this.tooltipList = new Array<any>();
  }

  loadGenres(movies: Movie[]) {
    let selectedGenres: Genre[];
    for (const movie of movies) {
      selectedGenres = [];
      for (const id of movie.genre_ids) {
        selectedGenres.push(AppService.genres?.find(g => g.id === id));
      }
      movie.genres = selectedGenres;
    }
  }

  getByIds(ids: number[]): Genre[] {
    const selectedGenres: Genre[] = [];
    for (const id of ids) {
      selectedGenres.push(AppService.genres?.find(g => g.id === id));
    }
    return selectedGenres;
  }

  private reducePageCounts(data: MoviesResponse | TrendingResponse) {
    if (data.total_pages > 500) {
      data.total_pages = 500;
      data.total_results = 10000;
    }
  }
}

class Urls {
  constructor() {
    this.apiKey = "c3e0e0bbd76f29d4079fec319091297f";
    this.baseUrl = "https://api.themoviedb.org/3/";
    this.movie = this.baseUrl + "movie/";
    this.topRatedMovies = `${this.movie}top_rated?api_key=${this.apiKey}`;
    this.popularMovies = `${this.movie}popular?api_key=${this.apiKey}`;
    this.genres = `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`;
  }

  readonly apiKey: string;
  readonly baseUrl: string;
  readonly movie: string;
  readonly topRatedMovies: string;
  readonly popularMovies: string;

  public getMovieById(id: number) {
    return `${this.movie}/${id}?api_key=${this.apiKey}`;
  }

  public getReviewsByMovieId(movieId: number) {
    return `${this.movie}/${movieId}/reviews?api_key=${this.apiKey}`;
  }

  public getSimilarMoviesByMovieId(id: number) {
    return `${this.movie}/${id}/similar?api_key=${this.apiKey}`;
  }

  public getCastByMovieId(id: number) {
    return `${this.movie}/${id}/credits?api_key=${this.apiKey}`;
  }

  public getTrending(mediaType: string, timeWindow: string) {
    return `${this.baseUrl}trending/${mediaType.toLowerCase()}/${timeWindow.toLowerCase()}?api_key=${this.apiKey}`;
  }

  public getMoviesByGenreId(id: number) {
    return `${this.baseUrl}discover/movie?api_key=${this.apiKey}&with_genres=${id}`;
  }

  public getMoviesByCastId(id: number) {
    return `${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}&with_genres=${id}`;
  }

  public getPersonById(personId: number) {
    return `${this.baseUrl}person/${personId}?api_key=${this.apiKey}&with_genres=${personId}`;
  }

  readonly genres: string;
}