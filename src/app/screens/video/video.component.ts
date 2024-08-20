import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PhaseStateService } from '../../services/phase-state.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-text-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  phaseNumber$: Observable<number>;
  topicName$: Observable<string | undefined>;
  video$: Observable<string | undefined>;
  contentText$: Observable<string | undefined>;
  nextScreenUrl$: Observable<string | null>;

  constructor(
    private phaseStateService: PhaseStateService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.phaseNumber$ = of(this.extractPhaseIdFromCurrentUrl());

    this.topicName$ = this.phaseNumber$.pipe(
      switchMap(phaseId =>
        this.phaseStateService.getPhaseById(phaseId).pipe(
          switchMap(phase => this.phaseStateService.currentTopicIndex$.pipe(
            map(topicIndex => phase?.topics[topicIndex]?.title)
          ))
        )
      )
    );

    this.video$ = combineLatest([
      this.phaseNumber$,
      this.phaseStateService.currentTopicIndex$,
      this.phaseStateService.currentContentIndex$
    ]).pipe(
      switchMap(([phaseId, topicIndex, contentIndex]) =>
        this.phaseStateService.getPhaseById(phaseId).pipe(
          map(phase => phase?.topics[topicIndex]?.contents[contentIndex]?.url)
        )
      )
    );

    this.contentText$ = combineLatest([
      this.phaseNumber$,
      this.phaseStateService.currentTopicIndex$,
      this.phaseStateService.currentContentIndex$
    ]).pipe(
      switchMap(([phaseId, topicIndex, contentIndex]) =>
        this.phaseStateService.getPhaseById(phaseId).pipe(
          map(phase => phase?.topics[topicIndex]?.contents[contentIndex]?.text)
        )
      )
    );

    this.nextScreenUrl$ = this.phaseNumber$.pipe(
      switchMap(phaseId => {
        const topicIndex = +this.route.snapshot.paramMap.get('topicIndex')!;
        const contentIndex = +this.route.snapshot.paramMap.get('contentIndex')!;
        const currentUrl = `text/${phaseId}/${topicIndex}/${contentIndex}`;
        return this.phaseStateService.getNextScreenUrl(currentUrl);
      })
    );
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const topicIndex = +params.get('topicIndex')!;
        const contentIndex = +params.get('contentIndex')!;
        const phaseId = this.extractPhaseIdFromCurrentUrl();

        return this.phaseStateService.getPhaseById(phaseId).pipe(
          tap(phase => {
            if (phase) {
              this.phaseStateService.setCurrentTopicIndex(topicIndex);
              this.phaseStateService.setCurrentContentIndex(contentIndex);
            }
          })
        );
      })
    ).subscribe();
  }

  close() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.location.back();
  }

  goToNextScreen() {
    this.nextScreenUrl$.subscribe(nextUrl => {
      if (nextUrl) {
        this.router.navigate([`/${nextUrl}`]);
      } else {
        console.warn('No next screen URL available.');
      }
    });
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
