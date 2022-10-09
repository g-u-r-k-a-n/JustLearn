import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MediaType, TimeWindow, TrendingResponse, TrendingService } from 'src/app/services/trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  providers: [TrendingService]
})
export class TrendingComponent implements OnInit {

  constructor(
    private readonly _trendingService: TrendingService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  trendingMovies: Movie[] | any;

  ngOnInit(): void {

    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");

    this._trendingService.get(MediaType.Movie, TimeWindow.Day, page).subscribe({
      next: data => this.model = data,
      error: e => this.errorEmit.emit(e.message)
    });
  }

  model: TrendingResponse | any = {};

  @Output()
  errorEmit = new EventEmitter<string>();
}