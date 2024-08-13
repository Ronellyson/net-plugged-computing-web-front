import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';  // Adicione isto
import { NgIf } from '@angular/common';
import { PhaseStateService } from '../../services/phase-state.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-phases-presentation',
  standalone: true,
  imports: [
    CommonModule,  // Certifique-se de incluir CommonModule
    NgIf,
    MatIconModule
  ],
  templateUrl: './phases-presentation.component.html',
  styleUrls: ['./phases-presentation.component.scss']
})
export class PhasesPresentationComponent implements OnInit {
  phaseTitle$!: Observable<string | undefined>;
  phaseNumber$!: Observable<number>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phaseStateService: PhaseStateService
  ) {}

  ngOnInit(): void {
    const phaseId = this.extractPhaseIdFromCurrentUrl();

    this.phaseTitle$ = this.phaseStateService.getPhaseTitle(phaseId);
    this.phaseNumber$ = of(phaseId);
  }

  close() {
    this.router.navigate(['/home']);
  }

  goToNextScreen() {
    const currentUrl = this.router.url;
    this.phaseStateService.getNextScreenUrl(currentUrl).pipe(
      switchMap(nextUrl => {
        if (nextUrl) {
          return this.router.navigate([`/${nextUrl}`]);
        } else {
          console.warn('No next screen URL available.');
          return of(false);
        }
      })
    ).subscribe();
  }

  private extractPhaseIdFromCurrentUrl(): number {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');

    if (segments.length > 2) {
      const phaseIdStr = segments[2];
      const phaseId = parseInt(phaseIdStr, 10);
      return isNaN(phaseId) ? 0 : phaseId;
    }

    return 0;
  }
}
