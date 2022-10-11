import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesByCastComponent } from './components/movies-by-cast/movies-by-cast.component';
import { MoviesByGenreComponent } from './components/movies-by-genre/movies-by-genre.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { RatedMoviesComponent } from './components/rated-movies/rated-movies.component';
import { TrendingComponent } from './components/trending/trending.component';

const routes: Routes = [
  { path: "genre/:id", component: MoviesByGenreComponent },
  { path: "genre/:id/pages/:page", component: MoviesByGenreComponent },
  { path: "cast/:id", component: MoviesByCastComponent },
  { path: "cast/:id/pages/:page", component: MoviesByCastComponent },
  { path: "movie/:id", component: MovieComponent },
  { path: "similar/:id/pages/:page", component: MovieComponent },
  { path: "movies", component: MoviesComponent },
  { path: "populars/pages/:page", component: PopularMoviesComponent },
  { path: "populars", component: PopularMoviesComponent },
  { path: "top-rateds/pages/:page", component: RatedMoviesComponent },
  { path: "top-rateds", component: RatedMoviesComponent },
  { path: "trending/pages/:page", component: TrendingComponent },
  { path: "trending", component: TrendingComponent },
  { path: "", redirectTo: "/trending", pathMatch: "full" },
  { path: "**", component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }