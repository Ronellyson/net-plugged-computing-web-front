import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionErrorTrackerService } from '../../../services/question-error-tracker.service';
import { QuestionAnswerService } from '../../../services/question-answer.service';

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
  @Input() feedbackEnable: boolean | undefined;
  @Input() feedbackFormUrl: string | undefined;

  totalErrors: number = 0;
  congratulations_message = '';
  starsArray: number[] = [];
  intervalId: any;

  constructor(
    private router: Router,
    private errorTracker: QuestionErrorTrackerService,
    private questionAnswerService: QuestionAnswerService
  ) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.totalErrors = this.phaseNumber
        ? this.errorTracker.getErrors(this.phaseNumber)
        : 0;
      this.calculateStars();
      this.updateCongratulationsMessage();
    }, 1000);
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

  updateCongratulationsMessage(): void {
    const starsCount = this.starsArray.length;

    if (starsCount === 5) {
      this.congratulations_message = 'Parabéns! Você atingiu a pontuação máxima!';
    } else if (starsCount === 4) {
      this.congratulations_message = 'Ótimo trabalho! Você está quase lá!';
    } else if (starsCount === 3) {
      this.congratulations_message = 'Bom esforço! Continue praticando!';
    } else if (starsCount === 2) {
      this.congratulations_message = 'Você pode melhorar! Não desista!';
    } else {
      this.congratulations_message = 'Continue tentando! Cada erro é uma oportunidade de aprendizado!';
    }
  }

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }

  restartPhase(): void {
    window.location.reload();
    this.errorTracker.resetErrors(this.phaseNumber);
    this.questionAnswerService.resetCorrectAnswersForPhase(this.phaseNumber);
  }

  openFeedbackFormInNewTab() {
    window.open(this.feedbackFormUrl, '_blank');
  }
}
