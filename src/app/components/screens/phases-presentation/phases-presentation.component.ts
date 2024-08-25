import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

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
  @Input() phaseTitle$!: Observable<string | undefined>;
  @Input() phaseNumber$!: Observable<number>;
}
