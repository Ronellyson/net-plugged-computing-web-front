import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-card',
  standalone: true,
  imports: [
    CommonModule, // Inclua o CommonModule aqui
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './phase-card.component.html',
  styleUrls: ['./phase-card.component.scss']
})
export class PhaseCardComponent {
  @Input() phaseId!: number;
  @Input() phaseTitle!: string;
  @Input() isLocked: boolean = true;

  constructor(
    private router: Router
  ) {}

  selectPhase(): void {
    if (!this.isLocked) {
      this.router.navigate([`/phases/${this.phaseId}`]);
    }
  }
}
