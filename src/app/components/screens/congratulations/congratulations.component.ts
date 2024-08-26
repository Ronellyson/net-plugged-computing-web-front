import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuizErrorTrackerService } from '../../../services/quiz-error-tracker.service';

@Component({
  selector: 'app-congratulations',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss'],
})
export class CongratulationsComponent implements OnInit, OnDestroy {
  @Input() phaseTitle: string | undefined;
  @Input() phaseNumber = 0;
  @Input() totalQuestions: number = 0;
  totalErrors: number = 0;

  congratulations_message = '';
  starsArray: number[] = [];
  intervalId: any;

  constructor(
    private router: Router,
    private errorTracker: QuizErrorTrackerService
  ) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.totalErrors = this.phaseNumber
        ? this.errorTracker.getErrors(this.phaseNumber)
        : 0;
      this.calculateStars();
    }, 1000);

    this.congratulations_message = `Parabéns por ter completado a fase ${this.phaseNumber}. Aqui está sua pontuação:`;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  calculateStars(): void {
    if (this.totalQuestions > 0) {
      const errorPercentage = this.totalErrors / this.totalQuestions;
      const maxStars = 5;
      const stars = Math.max(1, Math.round((1 - errorPercentage) * maxStars));
      this.starsArray = Array(stars).fill(0);
    }
  }

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }

  restartPhase(): void {
    this.errorTracker.resetErrors(this.phaseNumber);
    window.location.reload();
  }
}
