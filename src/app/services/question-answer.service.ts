import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  private storageKey = 'questionAnswers';

  constructor() {
    this.loadAnswers();
  }

  private loadAnswers(): void {
    const storedAnswers = sessionStorage.getItem(this.storageKey);
    if (storedAnswers) {
      this.correctAnswersMap = JSON.parse(storedAnswers);
    }
  }

  private saveAnswers(): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.correctAnswersMap));
  }

  private correctAnswersMap: { [phaseNumber: number]: { [questionId: number]: number } } = {};

  saveCorrectAnswer(phaseNumber: number, questionId: number, selectedAnswerId: number): void {
    if (!this.correctAnswersMap[phaseNumber]) {
      this.correctAnswersMap[phaseNumber] = {};
    }
    this.correctAnswersMap[phaseNumber][questionId] = selectedAnswerId;
    this.saveAnswers();
  }

  getCorrectAnswer(phaseNumber: number, questionId: number): number | undefined {
    return this.correctAnswersMap[phaseNumber]?.[questionId];
  }

  clearAnswersForPhase(phaseNumber: number): void {
    delete this.correctAnswersMap[phaseNumber];
    this.saveAnswers();
  }

  clearAllAnswers(): void {
    this.correctAnswersMap = {};
    this.saveAnswers();
  }
}
