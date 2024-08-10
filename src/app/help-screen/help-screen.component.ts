import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-help-screen',
  standalone: true,
  imports: [
    ScreenNavigatorComponent
  ],
  templateUrl: './help-screen.component.html',
  styleUrl: './help-screen.component.scss'
})
export class HelpScreenComponent {

}
