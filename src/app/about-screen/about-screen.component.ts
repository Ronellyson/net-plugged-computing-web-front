import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-about-screen',
  standalone: true,
  imports: [
    ScreenNavigatorComponent
  ],
  templateUrl: './about-screen.component.html',
  styleUrl: './about-screen.component.scss'
})
export class AboutScreenComponent {

}
