import { Injectable } from '@angular/core';
import { phases } from '../../assets/data/phase';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  private storageKey = 'questionAnswers';
  private completedPhasesKey = 'completedPhases';
  private correctAnswersMap: { [phaseNumber: number]: { [questionId: number]: number } } = {};
  private completedPhases: Set<number> = new Set();

  constructor() {
    this.loadAnswers();
    this.loadCompletedPhases();
  }

  private loadAnswers(): void {
    const storedAnswers = localStorage.getItem(this.storageKey);
    if (storedAnswers) {
      this.correctAnswersMap = JSON.parse(storedAnswers);
    }
  }

  private saveAnswers(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.correctAnswersMap));
  }

  private loadCompletedPhases(): void {
    const storedCompletedPhases = localStorage.getItem(this.completedPhasesKey);
    if (storedCompletedPhases) {
      this.completedPhases = new Set(JSON.parse(storedCompletedPhases));
    }
  }

  private saveCompletedPhases(): void {
    localStorage.setItem(this.completedPhasesKey, JSON.stringify(Array.from(this.completedPhases)));
  }

  private updateCompletedPhases(): void {
    phases.forEach(phase => {
      const questions = phase.contents.filter(content => content.type === 'question');
      const answers = this.getCorrectAnswersForPhase(phase.id) || {};
      const allQuestionsAnswered = questions.length === Object.keys(answers).length;

      if (allQuestionsAnswered) {
        this.completedPhases.add(phase.id);
        this.saveCompletedPhases();
      }
    });
  }

  getCompletedPhases(): number[] {
    this.updateCompletedPhases();
    return Array.from(this.completedPhases);
  }

  isPhaseCompleted(phaseId: number): boolean {
    return this.completedPhases.has(phaseId);
  }

  saveCorrectAnswer(phaseNumber: number, questionId: number, selectedAnswerId: number): void {
    if (!this.correctAnswersMap[phaseNumber]) {
      this.correctAnswersMap[phaseNumber] = {};
    }
    this.correctAnswersMap[phaseNumber][questionId] = selectedAnswerId;
    this.saveAnswers();
    this.updateCompletedPhases();
  }

  getCorrectAnswer(phaseNumber: number, questionId: number): number | undefined {
    return this.correctAnswersMap[phaseNumber]?.[questionId];
  }

  getCorrectAnswersForPhase(phaseNumber: number): { [questionId: number]: number } | undefined {
    return this.correctAnswersMap[phaseNumber];
  }

  resetCorrectAnswersForPhase(phaseNumber: number): void {
    delete this.correctAnswersMap[phaseNumber];
    this.saveAnswers();
  }
}
