import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenNavigatorComponent } from './components/widgets/screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScreenNavigatorComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'net-plugged-computing-web-front';
}
