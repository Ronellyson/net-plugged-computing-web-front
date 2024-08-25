import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../widgets/screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    ScreenNavigatorComponent
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
