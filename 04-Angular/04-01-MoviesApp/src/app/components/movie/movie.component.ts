import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Person } from 'src/app/models/person';
import { Review } from 'src/app/models/review';
import { AppService } from 'src/app/services/app.service';
import { CastService } from 'src/app/services/cast.service';
import { MoviesResponse, MoviesService } from 'src/app/services/movies.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [
    MoviesService,
    ReviewsService,
    CastService
  ]
})
export class MovieComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _reviewsService: ReviewsService,
    private readonly _castService: CastService,
    private readonly _appService: AppService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  movie: Movie;
  reviews: Review[] = [];
  cast: Person[] = [];
  model: MoviesResponse | any = {};
  loaded = false;

  ngOnInit(): void {
    const id: number = +this._activatedRoute.snapshot.paramMap.get("id");
    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");

    this._moviesService.getById(id).subscribe(data => {
      this.movie = data;
    });

    this._reviewsService.getByMovieId(id).subscribe(data => {
      this.movie.reviews = data.results;
    });

    this._moviesService.getSimilarsByMovieId(id, page).subscribe(data => {
      this.model = data;
      this.model.movieId = this.movie.id;
    });

    this._castService.getByMovieId(id).subscribe(data => {
      this.cast = data.cast;
    });

    this._appService.enableTooltip();
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  getReviewAvatarImage(value: string): string {
    if (value) {
      if (value.startsWith("/http")) {
        return value.substring(1, value.length);
      } else if (value.startsWith("/")) {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${value.substring(0, value.length)}`;
      }
    }
    return "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
  }
}
