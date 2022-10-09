import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { GenresComponent } from './components/genres/genres.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from './pipes/summary.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RemoveFirstCharPipe } from './pipes/remove-first-char.pipe';
import { AppService } from './services/app.service';
import { PrecisionPipe } from './pipes/precision.pipe';
import { TrendingComponent } from './components/trending/trending.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { RatedMoviesComponent } from './components/rated-movies/rated-movies.component';
import { GenresService } from './services/genres.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NoContentComponent } from './components/no-content/no-content.component';

import { SecurityContext } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MoviesByCastComponent } from './components/movies-by-cast/movies-by-cast.component';
import { MoviesByGenreComponent } from './components/movies-by-genre/movies-by-genre.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    GenresComponent,
    NavbarComponent,
    SummaryPipe,
    RemoveFirstCharPipe,
    PrecisionPipe,
    TrendingComponent,
    PopularMoviesComponent,
    RatedMoviesComponent,
    PaginationComponent,
    NoContentComponent,
    MoviesByCastComponent,
    MoviesByGenreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.HTML })
  ],
  providers: [
    AppService,
    GenresService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
