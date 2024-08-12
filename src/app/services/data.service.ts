import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PhaseData, Phase } from '../types/phase-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = '../../data/data.json';

  constructor() {}

  getPhases(): Observable<Phase[]> {
    return this.fetchData().pipe(
      map(data => this.transformData(data)),
      catchError(error => {
        console.error('Error fetching phases:', error);
        return of([]);
      })
    );
  }

  getPhaseById(id: number): Observable<Phase | null> {
    return this.getPhases().pipe(
      map(phases => phases.find(phase => phase.id === id) ?? null)
    );
  }

  private fetchData(): Observable<PhaseData[]> {
    return new Observable<PhaseData[]>(observer => {
      fetch(this.dataUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: PhaseData[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  private transformData(data: PhaseData[]): Phase[] {
    return data.map(item => item.phase);
  }
}
