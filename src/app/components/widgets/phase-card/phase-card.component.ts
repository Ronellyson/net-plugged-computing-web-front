import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './phase-card.component.html',
  styleUrls: ['./phase-card.component.scss']
})
export class PhaseCardComponent {
  @Input() phaseId!: number;
  @Input() phaseTitle!: string;

  constructor(
    private router: Router
  ) {}

  selectPhase(): void {
    this.router.navigate([`/phases/${this.phaseId}`]);
  }
}
