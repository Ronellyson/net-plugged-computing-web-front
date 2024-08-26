import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() phaseNumber: number | undefined;
  @Input() question: string | undefined;
  @Input() icon: string | undefined;
  @Input() options: string[] | undefined;
  @Input() answer: string | undefined;
}
