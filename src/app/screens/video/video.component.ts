import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PhaseStateService } from '../../services/phase-state.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe.pipe';
import { close, goBack, goToNextScreen, extractPhaseIdFromCurrentUrl } from '../../utils/utils';

@Component({
  selector: 'app-video-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SafeUrlPipe
  ],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  phaseNumber$: Observable<number>;
  topicName$: Observable<string | undefined>;
  url$: Observable<string | undefined>;
  contentText$: Observable<string | undefined>;
  nextScreenUrl$: Observable<string | null>;

  constructor(
    private phaseStateService: PhaseStateService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.phaseNumber$ = of(extractPhaseIdFromCurrentUrl(this.router));

    this.topicName$ = this.phaseNumber$.pipe(
      switchMap(phaseId =>
        this.phaseStateService.getPhaseById(phaseId).pipe(
          switchMap(phase => this.phaseStateService.currentTopicIndex$.pipe(
            map(topicIndex => phase?.topics[topicIndex]?.title)
          ))
        )
      )
    );

    this.url$ = combineLatest([
      this.phaseNumber$,
      this.phaseStateService.currentTopicIndex$,
      this.phaseStateService.currentContentIndex$
    ]).pipe(
      switchMap(([phaseId, topicIndex, contentIndex]) =>
        this.phaseStateService.getPhaseById(phaseId).pipe(
          map(phase => {
            const content = phase?.topics[topicIndex]?.contents[contentIndex];
            return content?.url;
          })
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
        const currentUrl = `video/${phaseId}/${topicIndex}/${contentIndex}`;
        return this.phaseStateService.getNextScreenUrl(currentUrl);
      })
    );
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const topicIndex = +params.get('topicIndex')!;
        const contentIndex = +params.get('contentIndex')!;
        const phaseId = extractPhaseIdFromCurrentUrl(this.router);

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
    close(this.router);
  }

  goBack() {
    goBack(this.location);
  }

  goToNextScreen() {
    goToNextScreen(this.nextScreenUrl$, this.router);
  }
}
