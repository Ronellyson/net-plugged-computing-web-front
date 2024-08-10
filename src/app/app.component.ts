import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';

import { ScreenNavigatorComponent } from './components/screen-navigator/screen-navigator.component';

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
