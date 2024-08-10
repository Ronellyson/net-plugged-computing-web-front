import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../components/screen-navigator/screen-navigator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScreenNavigatorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
