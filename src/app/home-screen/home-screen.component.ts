import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CommonModule,
    ScreenNavigatorComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {

}
