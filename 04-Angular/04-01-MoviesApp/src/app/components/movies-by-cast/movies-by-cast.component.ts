import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person';
import { MoviesResponse, MoviesService } from 'src/app/services/movies.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-movies-by-cast',
  templateUrl: './movies-by-cast.component.html',
  styleUrls: ['./movies-by-cast.component.css'],
  providers: [
    MoviesService,
    PersonService
  ]
})
export class MoviesByCastComponent implements OnInit {
  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _personService: PersonService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get("id");
    const page: number = +this._activatedRoute.snapshot.paramMap.get("page");

    this._moviesService.getByCastId(id, page).subscribe({
      next: data => {
        this.model.results = data.cast;
        this._personService.getById(id).subscribe(data => {
          this.model.header = data.name + `'s ${this.model.results.length}`;
          this.person = data;
        });
      },
      error: e => this.errorEmit.emit(e.message)
    });
  }

  model: MoviesResponse | any = {};
  person: Person;

  @Output()
  errorEmit = new EventEmitter<string>();
}
