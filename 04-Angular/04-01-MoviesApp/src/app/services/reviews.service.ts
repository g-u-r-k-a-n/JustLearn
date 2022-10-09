import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Review } from '../models/review';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _appService: AppService
  ) { }

  getByMovieId(movieId: number): Observable<ReviewResponse> {
    return this._httpClient.get<ReviewResponse>(this._appService.urls.getReviewsByMovieId(movieId)).pipe(
      tap(data => {
        console.log("Reviews :", data);
      })
    );
  }
}

class ReviewResponse {
  id: number;
  page: number;
  results: Review[]
}
