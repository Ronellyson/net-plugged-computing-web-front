import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../widgets/screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ScreenNavigatorComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
