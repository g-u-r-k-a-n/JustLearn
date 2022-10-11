import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { MovieHeaders, MoviesResponse } from 'src/app/services/movies.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewChecked {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _appService: AppService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    if (this.model.page) {
      const response = (this.model as MoviesResponse);

      this.pageCount = [];
      if (response.page == 1 || response.page == 2) {
        this.pageCount.push(1, 2, 3);
      }
      else {
        for (let i = 2; i > 0; i--) {
          this.pageCount?.push(response.page - i);
        }
        if (this.model.page <= 500) {
          for (let i = 0; i <= 2; i++) {
            this.pageCount?.push(response.page + i);
          }
        }
      }

      const header = (response.header as MovieHeaders)
      switch (header) {
        case MovieHeaders.Popular:
          this.urlPath = "populars";
          break;
        case MovieHeaders.TopRated:
          this.urlPath = "top-rateds";
          break;
        case MovieHeaders.Trending:
          this.urlPath = "trending";
          break;
        case MovieHeaders.Similar:
          this.urlPath = `similar/${this.model.movieId}`;
          break;
        default:
          const id: number = +this._activatedRoute.snapshot.paramMap.get("id");
          if (id && response.header.includes("genre")) {
            response.header = response.header.substring(0, response.header.indexOf("genre") - 1);
            this.urlPath = `genre/${id}/`;
          }
          break;
      }
    }
  }

  @Input()
  model: MoviesResponse | any = {};

  urlPath: string;
  pageCount: number[];

  reloadComponent() {
    this._appService.reloadComponent();
  }

  getPreviousPages(model: MoviesResponse): number {
    if (model.page / 10 > 0) {
      return parseInt((model.page / 10).toString());
    } else {
      return 1;
    }
  }

  getNextPages(model: MoviesResponse): number {
    if (model.page * 10 < model.total_pages) {
      return parseInt((model.page * 10).toString());
    } else if (model.page * 5 < model.total_pages) {
      return parseInt((model.page * 5).toString());
    } else if (model.page * 3 < model.total_pages) {
      return parseInt((model.page * 3).toString());
    } else if (model.page * 2 < model.total_pages) {
      return parseInt((model.page * 2).toString());
    } else {
      return model.total_pages;
    }
  }
}