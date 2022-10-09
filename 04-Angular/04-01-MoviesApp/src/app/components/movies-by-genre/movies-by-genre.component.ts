import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { MoviesResponse, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-by-genre',
  templateUrl: './movies-by-genre.component.html',
  styleUrls: ['./movies-by-genre.component.css'],
  providers: [MoviesService]
})
export class MoviesByGenreComponent implements OnInit {

  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get("id");
    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");

    this._moviesService.getByGenreId(id, page).subscribe({
      next: data => {
        this.model = data;
        this.model.header = AppService.genres.find(g => g.id === id).name + " genre";
      },
      error: e => this.errorEmit.emit(e.message)
    });
  }

  model: MoviesResponse | any = {};

  @Output()
  errorEmit = new EventEmitter<string>();
}
