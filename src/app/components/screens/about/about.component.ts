import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../widgets/screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ScreenNavigatorComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

}
