import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions-presentation',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './questions-presentation.component.html',
  styleUrls: ['./questions-presentation.component.scss']
})
export class QuestionsPresentationComponent {
  @Input() questionsPresentationTitle$!: Observable<string | undefined>;
  @Input() phaseNumber$!: Observable<number>;
}
