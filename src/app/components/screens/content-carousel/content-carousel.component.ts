import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '../../../types/phase-data';
import { phases } from '../../../../assets/data/phase';
import { ActivatedRoute } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TextComponent } from '../text/text.component';
import { VideoComponent } from '../video/video.component';
import { QuestionsPresentationComponent } from '../questions-presentation/questions-presentation.component';
import { QuestionComponent } from '../question/question.component';
import { CongratulationsComponent } from '../congratulations/congratulations.component';
import { QuestionAnswerService } from '../../../services/question-answer.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-content-carousel',
  standalone: true,
  imports: [
    CommonModule,
    ImageComponent,
    MatIconModule,
    TextComponent,
    VideoComponent,
    QuestionsPresentationComponent,
    QuestionComponent,
    CongratulationsComponent,
  ],
  templateUrl: './content-carousel.component.html',
  styleUrls: ['./content-carousel.component.scss'],
})
export class ContentCarouselComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  contents: Content[] = [];
  phaseId: any;
  phaseTitle: any;
  totalQuestions: any;
  isFirst = true;
  isLast = false;
  isNextEnabled = false;
  isCongratulation = false;
  verificationSubscription: Subscription | null = null;

  informationScreens = [
    'phasePresentation',
    'questionsPresentation',
    'congratulation',
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private router: Router,
    private questionAnswerService: QuestionAnswerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.phaseId = id;
      this.phaseTitle = phases.find(
        (phase) => phase.id === Number(id)
      )?.title || '';
      this.contents = phases.find(
        (phase) => phase.id === Number(id)
      )?.contents || [];
      this.totalQuestions = this.contents.filter(
        (content) => content.type === 'question'
      ).length;
      this.checkIfNextShouldBeEnabled();
    });

    const myCarousel = document.getElementById('carouselExampleCaptions');

    myCarousel?.addEventListener('slide.bs.carousel', (event: any) => {
      this.currentIndex = event['to'];
      this.isFirst = this.currentIndex === 0;
      this.isLast = this.currentIndex === this.contents.length - 1;
      this.updateCongratulationStatus();
      this.checkIfNextShouldBeEnabled();
    });

    this.updateCongratulationStatus();
    this.checkIfNextShouldBeEnabled();
  }

  ngOnDestroy(): void {
    this.verificationSubscription?.unsubscribe();
  }

  navigateHome(): void {
    this.router.navigate([`/home`]);
  }

  getCurrentItem() {
    return this.contents[this.currentIndex];
  }

  isAInformationScreen() {
    return !!this.informationScreens?.includes(this.getCurrentItem()?.type);
  }

  private updateCongratulationStatus() {
    this.isCongratulation = this.getCurrentItem()?.type === 'congratulation';
  }

  private checkIfNextShouldBeEnabled() {
    this.verificationSubscription?.unsubscribe();

    if (this.isCongratulation) {
      this.isNextEnabled = false;
    } else if (this.getCurrentItem()?.type === 'question' && this.phaseId) {
      this.isNextEnabled = false;
      const questionId = this.getCurrentItem()?.id;
      if (questionId !== undefined) {
        this.verificationSubscription = interval(0).subscribe(() => {
          const correctAnswer = this.questionAnswerService.getCorrectAnswer(this.phaseId, questionId);
          this.isNextEnabled = correctAnswer !== undefined;
        });
      }
    } else {
      this.isNextEnabled = true;
    }
  }
}
