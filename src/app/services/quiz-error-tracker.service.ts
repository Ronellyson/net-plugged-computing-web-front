import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizErrorTrackerService {
  private storageKeyPrefix = 'quizErrors_';

  constructor() { }

  private getStorageKey(phaseId: number): string {
    return `${this.storageKeyPrefix}${phaseId}`;
  }

  incrementErrors(phaseId: number): void {
    let currentCount = this.getErrors(phaseId);
    currentCount++;
    localStorage.setItem(this.getStorageKey(phaseId), currentCount.toString());
  }

  getErrors(phaseId: number): number {
    const count = localStorage.getItem(this.getStorageKey(phaseId));
    return count ? parseInt(count, 10) : 0;
  }

  resetErrors(phaseId: number): void {
    localStorage.removeItem(this.getStorageKey(phaseId));
  }
}
