import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionErrorTrackerService } from '../../../services/question-error-tracker.service';
import { QuestionAnswerService } from '../../../services/question-answer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-answer-choice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-choice.component.html',
  styleUrls: ['./answer-choice.component.scss']
})
export class AnswerChoiceComponent implements OnInit, OnDestroy {
  @Input() phaseNumber: number | undefined;
  @Input() questionId: number | undefined;
  @Input() buttonText: string | undefined;
  @Input() answerChoiceIndex: number | undefined;
  @Input() answerIndex: number | undefined;

  isClicked: boolean = false;
  isError: boolean = false;
  isDisabled: boolean = false;
  private checkInterval: any;

  constructor(
    private errorTracker: QuestionErrorTrackerService,
    private questionAnswerService: QuestionAnswerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.startCheckingAnswer();
  }

  ngOnDestroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  private startCheckingAnswer(): void {
    this.checkInterval = setInterval(() => {
      this.checkAnswerState();
    }, 1000); // Check every second
  }

  private checkAnswerState(): void {
    if (this.phaseNumber !== undefined && this.questionId !== undefined) {
      const savedAnswerIndex = this.questionAnswerService.getCorrectAnswer(this.phaseNumber, this.questionId);

      if (savedAnswerIndex !== undefined) {
        this.isDisabled = true; // Disable all choices once an answer is selected
        if (this.answerChoiceIndex === savedAnswerIndex) {
          this.isClicked = true; // Mark the correct answer as clicked
        }
      }
    }
  }

  toggleActiveState(): void {
    if (!this.isDisabled) {
      this.isClicked = true;
      if (this.isAnswerCorrect()) {
        this.toastr.success('Resposta Correta!');
        if (this.phaseNumber && this.questionId && this.answerChoiceIndex !== undefined) {
          this.questionAnswerService.saveCorrectAnswer(this.phaseNumber, this.questionId, this.answerChoiceIndex);
        } else {
          console.log("phaseNumber, questionId, or answerChoiceIndex is undefined");
        }
      }

      if (this.isAnswerIncorrect()) {
        this.toastr.error('Resposta Incorreta!');
        if (this.phaseNumber) {
          this.errorTracker.incrementErrors(this.phaseNumber);
        } else {
          console.log("phaseNumber is undefined");
        }
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
          this.isClicked = false;
        }, 1000);
      }
    }
  }

  isAnswerCorrect(): boolean {
    return this.isClicked && this.answerChoiceIndex === this.answerIndex;
  }

  isAnswerIncorrect(): boolean {
    return this.isClicked && this.answerChoiceIndex !== this.answerIndex;
  }
}
