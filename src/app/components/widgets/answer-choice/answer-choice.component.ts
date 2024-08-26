import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer-choice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-choice.component.html',
  styleUrls: ['./answer-choice.component.scss']
})
export class AnswerChoiceComponent {
  @Input() buttonText: string | undefined;
  @Input() answer: string | undefined;

  isClicked: boolean = false;
  isError: boolean = false;

  toggleActiveState(): void {
    this.isClicked = true;
    if (this.isAnswerIncorrect()) {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
        this.isClicked = false;
      }, 1000);
    }
  }

  isAnswerCorrect(): boolean {
    return this.isClicked && this.buttonText === this.answer;
  }

  isAnswerIncorrect(): boolean {
    return this.isClicked && this.buttonText !== this.answer;
  }
}
