import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../widgets/screen-navigator/screen-navigator.component';
import { PhaseCardListComponent } from '../../widgets/phase-card-button-list/phase-card-list.component';
import { DeleteDataButtonComponent } from "../../widgets/delete-data-button/delete-data-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScreenNavigatorComponent,
    PhaseCardListComponent,
    DeleteDataButtonComponent
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
}
