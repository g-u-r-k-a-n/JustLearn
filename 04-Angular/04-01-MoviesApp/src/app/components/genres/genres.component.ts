import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { AppService } from 'src/app/services/app.service';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(
    private readonly _genresService: GenresService,
    private readonly _appService: AppService
  ) { }

  ngOnInit(): void {
    this._genresService.getAll().subscribe(genres => {
      this.genres = genres;
    });
  }

  genres: Genre[] = [];

  reloadComponent() {
    this._appService.reloadComponent();
  }
}
