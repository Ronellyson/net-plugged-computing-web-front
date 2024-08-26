import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnswerChoiceComponent } from "../answer-choice/answer-choice.component";

@Component({
  selector: 'app-answer-choice-list',
  standalone: true,
  imports: [
    NgFor,
    AnswerChoiceComponent
],
  templateUrl: './answer-choice-list.component.html',
  styleUrl: './answer-choice-list.component.scss'
})
export class AnswerChoiceListComponent {
  @Input() phaseNumber: number | undefined;
  @Input() questionId: number | undefined;
  @Input() options: string[] | undefined;
  @Input() answerIndex: number | undefined;
}
