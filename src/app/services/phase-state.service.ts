import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from './data.service';
import { Phase } from '../types/phase-data';

@Injectable({
  providedIn: 'root'
})
export class PhaseStateService {
  private selectedPhaseIdSubject = new BehaviorSubject<number | null>(null);
  selectedPhaseId$ = this.selectedPhaseIdSubject.asObservable();

  constructor(private dataService: DataService) {}

  setSelectedPhase(phaseId: number): void {
    this.selectedPhaseIdSubject.next(phaseId);
  }

  getSelectedPhase(): Observable<Phase | null> {
    return this.selectedPhaseId$.pipe(
      switchMap(phaseId => {
        if (phaseId === null) {
          return of(null);
        }
        return this.dataService.getPhaseById(phaseId);
      })
    );
  }
}
