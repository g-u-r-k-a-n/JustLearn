import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MoviesResponse } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, AfterViewInit {

  constructor(private readonly _appService: AppService) {
  }

  @Input()
  model: MoviesResponse | any = {};

  @Input()
  error: EventEmitter<string>;

  loaded = false;
  errorMessage: string;

  ngOnInit(): void {
    this.error?.subscribe(data => {
      this.errorMessage = data;
    })
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  reloadComponent() {
    this._appService.reloadComponent();
    window.scrollTo(0, 0);
  }
}