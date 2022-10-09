import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesResponse, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css'],
  providers: [MoviesService]
})
export class RatedMoviesComponent implements OnInit {

  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");
    this._moviesService.geTopRateds(page).subscribe({
      next: data => this.model = data,
      error: e => this.errorEmit.emit(e.message)
    });
  }

  model: MoviesResponse | any = {};

  @Output()
  errorEmit = new EventEmitter<string>();
}