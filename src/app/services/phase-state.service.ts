import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { DataService } from './data.service';
import { Phase } from '../types/phase-data';

@Injectable({
  providedIn: 'root',
})
export class PhaseStateService {
  private currentTopicIndexSubject = new BehaviorSubject<number>(0);
  private currentContentIndexSubject = new BehaviorSubject<number>(0);

  currentTopicIndex$ = this.currentTopicIndexSubject.asObservable();
  currentContentIndex$ = this.currentContentIndexSubject.asObservable();

  constructor(private dataService: DataService) {}

  setCurrentTopicIndex(index: number): void {
    this.currentTopicIndexSubject.next(index);
  }

  setCurrentContentIndex(index: number): void {
    this.currentContentIndexSubject.next(index);
  }

  getPhaseById(phaseId: number): Observable<Phase | null> {
    return this.dataService.getPhaseById(phaseId);
  }

  getPhaseTitle(phaseId: number): Observable<string | undefined> {
    return this.getPhaseById(phaseId).pipe(
      map(phase => this.extractPhaseTitle(phase, phaseId))
    );
  }

  getNextScreenUrl(currentUrl: string): Observable<string | null> {
    const { phaseId, topicIndex, contentIndex } = this.parseCurrentUrl(currentUrl);

    return this.getPhaseById(phaseId).pipe(
      filter((phase): phase is Phase => phase !== null),
      map(phase => this.calculateNextUrl(phase, topicIndex, contentIndex, phaseId))
    );
  }

  incrementContentIndex(): void {
    this.currentContentIndexSubject.next(
      this.currentContentIndexSubject.getValue() + 1
    );
  }

  incrementTopicIndex(): void {
    this.currentTopicIndexSubject.next(
      this.currentTopicIndexSubject.getValue() + 1
    );
  }

  private extractPhaseTitle(phase: Phase | null, phaseId: number): string | undefined {
    console.log(`Phase data for ID ${phaseId}:`, phase);
    return phase?.phasePresentation?.title;
  }

  private parseCurrentUrl(currentUrl: string): { phaseId: number, topicIndex: number, contentIndex: number } {
    const [type, phaseIdStr, topicIndexStr, contentIndexStr] = currentUrl.split('/').filter(segment => segment);
    const phaseId = +phaseIdStr;
    const topicIndex = +topicIndexStr || 0;
    const contentIndex = +contentIndexStr || 0;

    console.log(`Processing URL: ${currentUrl}`);
    console.log(`Parsed phaseId: ${phaseId}, topicIndex: ${topicIndex}, contentIndex: ${contentIndex}`);

    return { phaseId, topicIndex, contentIndex };
  }

  private calculateNextUrl(phase: Phase, topicIndex: number, contentIndex: number, phaseId: number): string | null {
    console.log(`Phase data:`, phase);

    if (this.areAllTopicsCompleted(phase, topicIndex)) {
      return this.getQuestionsScreenUrl(phaseId);
    }

    const nextContentUrl = this.getNextContentUrl(phase.topics[topicIndex], contentIndex, phaseId, topicIndex);
    if (nextContentUrl) {
      return nextContentUrl;
    }

    return this.getNextTopicUrl(phase, topicIndex, phaseId);
  }

  private areAllTopicsCompleted(phase: Phase, topicIndex: number): boolean {
    return topicIndex >= phase.topics.length - 1 &&
           this.currentContentIndexSubject.getValue() >= phase.topics[topicIndex].contents.length - 1;
  }

  private getQuestionsScreenUrl(phaseId: number): string | null {
    return `questions-presentation/${phaseId}`;
  }

  private getNextContentUrl(topic: any, contentIndex: number, phaseId: number, topicIndex: number): string | null {
    if (contentIndex < topic.contents.length - 1) {
      const nextContentIndex = contentIndex + 1;
      const nextContent = topic.contents[nextContentIndex];
      if (nextContent) {
        return `${nextContent.type}/${phaseId}/${topicIndex}/${nextContentIndex}`;
      }
    }
    return null;
  }

  private getNextTopicUrl(phase: Phase, topicIndex: number, phaseId: number): string | null {
    if (topicIndex < phase.topics.length - 1) {
      const nextTopicIndex = topicIndex + 1;
      const nextTopic = phase.topics[nextTopicIndex];
      if (nextTopic && nextTopic.contents.length > 0) {
        const firstContent = nextTopic.contents[0];
        if (firstContent) {
          return `${firstContent.type}/${phaseId}/${nextTopicIndex}/0`;
        }
      }
    }
    return null;
  }
}
