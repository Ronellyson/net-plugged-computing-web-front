import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { Phase } from '../../../types/phase-data';
import { phases } from '../../../../assets/data/phase';
import { QuestionAnswerService } from '../../../services/question-answer.service';
import { PhaseCardButtonComponent } from '../phase-card-button/phase-card-button.component';

@Component({
  selector: 'app-phase-card-list',
  standalone: true,
  imports: [
    PhaseCardButtonComponent,
    NgFor
  ],
  templateUrl: './phase-card-list.component.html',
  styleUrls: ['./phase-card-list.component.scss']
})
export class PhaseCardListComponent implements OnInit, OnDestroy {
  phases: Phase[] = phases;
  completedPhases: number[] = [];
  private intervalId: any;

  constructor(private questionAnswerService: QuestionAnswerService) {}

  ngOnInit(): void {
    this.updateCompletedPhases();
    this.intervalId = setInterval(() => {
      this.updateCompletedPhases();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCompletedPhases(): void {
    this.completedPhases = this.questionAnswerService.getCompletedPhases();
  }
}
