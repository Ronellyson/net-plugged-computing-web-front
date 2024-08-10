import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenNavigatorComponent } from '../../components/screen-navigator/screen-navigator.component';
import { PhaseCardListComponent } from '../../components/phase-card-list/phase-card-list.component';
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
  phases = [
    { number: 1, title: 'Fase 1', description: 'Introdução a Redes de Computadores' },
    { number: 2, title: 'Fase 2', description: 'Internet' },
    { number: 3, title: 'Fase 3', description: 'Segurança' },
    { number: 4, title: 'Fase 4', description: 'De que se trata tudo isso?' },
  ];
}
