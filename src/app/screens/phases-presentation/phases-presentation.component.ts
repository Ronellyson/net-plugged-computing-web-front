import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { PhaseStateService } from '../../services/phase-state.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { close, goBack, goToNextScreen, extractPhaseIdFromCurrentUrl } from '../../utils/utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-phases-presentation',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './phases-presentation.component.html',
  styleUrls: ['./phases-presentation.component.scss']
})
export class PhasesPresentationComponent implements OnInit {
  phaseTitle$!: Observable<string | undefined>;
  phaseNumber$!: Observable<number>;
  nextScreenUrl$: Observable<string | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phaseStateService: PhaseStateService,
    private location: Location  // Injeta o Location
  ) {
    this.phaseNumber$ = of(extractPhaseIdFromCurrentUrl(this.router));

    this.nextScreenUrl$ = this.phaseNumber$.pipe(
      switchMap(phaseId => {
        const currentUrl = `phases-presentation/${phaseId}`;
        return this.phaseStateService.getNextScreenUrl(currentUrl);
      })
    );
  }

  ngOnInit(): void {
    const phaseId = extractPhaseIdFromCurrentUrl(this.router);

    this.phaseTitle$ = this.phaseStateService.getPhaseTitle(phaseId);
    this.phaseNumber$ = of(phaseId);
  }

  close() {
    close(this.router);
  }

  goBack() {
    goBack(this.location);
  }

  goToNextScreen() {
    goToNextScreen(this.nextScreenUrl$, this.router);
  }
}
