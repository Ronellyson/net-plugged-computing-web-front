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
  @Input() phaseNumber!: number;
  @Input() phaseTitle!: string;
  @Input() phaseDescription!: string;

  constructor(private router: Router) {}

  navigateToPhase(): void {
    this.router.navigate(['/content-switcher', this.phaseNumber]);
  }
}
