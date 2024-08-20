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
      map(phase => {
        console.log(`Phase data for ID ${phaseId}:`, phase);
        return phase?.phasePresentation?.title;
      })
    );
  }

  getNextScreenUrl(currentUrl: string): Observable<string | null> {
    const [type, phaseIdStr, topicIndexStr, contentIndexStr] = currentUrl.split('/').filter(segment => segment); // Remove empty segments
    const phaseId = +phaseIdStr;
    const topicIndex = +topicIndexStr || 0;
    const contentIndex = +contentIndexStr || 0;

    console.log(`Processing URL: ${currentUrl}`);
    console.log(`Parsed phaseId: ${phaseId}, topicIndex: ${topicIndex}, contentIndex: ${contentIndex}`);

    return this.getPhaseById(phaseId).pipe(
      filter((phase): phase is Phase => phase !== null),
      map((phase: Phase) => {
        console.log(`Phase data:`, phase);

        let nextUrl: string | null = null;
        const topic = phase.topics[topicIndex];

        if (topic) {
          if (contentIndex < topic.contents.length - 1) {
            // Próximo conteúdo no mesmo tópico
            const nextContentIndex = contentIndex + 1;
            const nextContent = topic.contents[nextContentIndex];
            if (nextContent) {
              nextUrl = `${nextContent.type}/${phaseId}/${topicIndex}/${nextContentIndex}`;
            }
          } else if (topicIndex < phase.topics.length - 1) {
            // Próximo tópico
            const nextTopicIndex = topicIndex + 1;
            const nextTopic = phase.topics[nextTopicIndex];
            if (nextTopic && nextTopic.contents.length > 0) {
              // Primeiro conteúdo do próximo tópico
              const firstContent = nextTopic.contents[0];
              if (firstContent) {
                nextUrl = `${firstContent.type}/${phaseId}/${nextTopicIndex}/0`;
              }
            }
          }
        }

        console.log(`Next URL: ${nextUrl}`);
        return nextUrl;
      })
    );
  }

  incrementContentIndex() {
    this.currentContentIndexSubject.next(
      this.currentContentIndexSubject.getValue() + 1
    );
  }

  incrementTopicIndex() {
    this.currentTopicIndexSubject.next(
      this.currentTopicIndexSubject.getValue() + 1
    );
  }
}
