import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../widgets/screen-navigator/screen-navigator.component';
import { PhaseCardListComponent } from '../../widgets/phase-card-button-list/phase-card-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScreenNavigatorComponent,
    PhaseCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
