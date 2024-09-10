import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-card-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './phase-card-button.component.html',
  styleUrl: './phase-card-button.component.scss',
})
export class PhaseCardButtonComponent {
  @Input() phaseId!: number;
  @Input() phaseTitle!: string;
  @Input() isLocked: boolean = true;

  constructor(private router: Router) {}

  selectPhase(): void {
    if (!this.isLocked) {
      this.router.navigate([`/phases/${this.phaseId}`]);
    }
  }
}
