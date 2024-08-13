import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Phase, Topic, Content } from '../types/phase-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = '../../data/data.json';
  private phasesCache: Phase[] | null = null;

  constructor() {}

  getPhases(): Observable<Phase[]> {
    if (this.phasesCache) {
      return of(this.phasesCache);
    }

    return this.fetchData().pipe(
      tap(data => {
        console.log('Fetched phases data:', data);
        this.phasesCache = data; // Agora data já é um array de Phase
      }),
      catchError(error => {
        console.error('Error fetching phases:', error);
        return of([]);
      })
    );
  }

  getPhaseById(id: number): Observable<Phase | null> {
    return this.getPhases().pipe(
      map(phases => {
        const phase = phases.find(phase => phase.id === id);
        console.log('Fetched phase by ID:', phase);
        return phase ?? null;
      })
    );
  }

  getTopicByIndex(phaseId: number, topicIndex: number): Observable<Topic | null> {
    return this.getPhaseById(phaseId).pipe(
      map(phase => {
        const topic = phase?.topics[topicIndex];
        console.log('Fetched topic by index:', topic);
        return topic ?? null;
      })
    );
  }

  getContentByIndex(phaseId: number, topicIndex: number, contentIndex: number): Observable<Content | null> {
    return this.getTopicByIndex(phaseId, topicIndex).pipe(
      map(topic => {
        const content = topic?.contents[contentIndex];
        console.log('Fetched content by index:', content);
        return content ?? null;
      })
    );
  }

  private fetchData(): Observable<Phase[]> {
    return new Observable<Phase[]>(observer => {
      fetch(this.dataUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Phase[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          observer.error(error);
        });
    });
  }
}
