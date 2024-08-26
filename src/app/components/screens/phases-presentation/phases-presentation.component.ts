import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phases-presentation',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './phases-presentation.component.html',
  styleUrls: ['./phases-presentation.component.scss']
})
export class PhasesPresentationComponent {
  @Input() phaseTitle: string | undefined;
  @Input() phaseNumber: number | undefined;
}
