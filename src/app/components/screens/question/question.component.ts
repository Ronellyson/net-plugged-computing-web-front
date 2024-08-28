import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AnswerChoiceListComponent } from "../../widgets/answer-choice-list/answer-choice-list.component";

@Component({
  selector: 'app-question-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    AnswerChoiceListComponent
],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() questionId: number | undefined;
  @Input() phaseNumber: number | undefined;
  @Input() question: string | undefined;
  @Input() icon: string | undefined;
  @Input() options: string[] | undefined;
  @Input() answerIndex: number | undefined;
}
