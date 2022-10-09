import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'MoviesApp';

  backToTop() {
    window.scrollTo(0, 0);
  }

  error: string;

}
