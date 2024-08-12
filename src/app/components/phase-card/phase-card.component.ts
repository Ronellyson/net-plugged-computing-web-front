import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PhaseStateService } from '../../services/phase-state.service';

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

  constructor(
    private phaseStateService: PhaseStateService,
    private router: Router
  ) {}

  selectPhase(): void {
    this.phaseStateService.setSelectedPhase(this.phaseNumber);

    this.phaseStateService.getSelectedPhase().subscribe(selectedPhase => {
      if (selectedPhase) {
        console.log('SelectedPhase: ', selectedPhase);
        this.router.navigate(['/phases-presentation']);
      }
    });
  }
}
