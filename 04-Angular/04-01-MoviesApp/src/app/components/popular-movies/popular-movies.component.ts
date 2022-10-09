import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesResponse, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css'],
  providers: [MoviesService]
})
export class PopularMoviesComponent implements OnInit {

  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");

    this._moviesService.getPopulars(page).subscribe({
      next: data => this.model = data,
      error: e => this.errorEmit.emit(e.message)
    });
  }

  model: MoviesResponse | any = {};

  @Output()
  errorEmit = new EventEmitter<string>();
}
