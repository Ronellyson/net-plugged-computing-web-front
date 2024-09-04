import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionErrorTrackerService {
  private storageKeyPrefix = 'questionErrors';

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

  async resetErrors(phaseId: number): Promise<void> {
    localStorage.removeItem(this.getStorageKey(phaseId));
  }

  async resetAllErrors(): Promise<void> {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.storageKeyPrefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}
