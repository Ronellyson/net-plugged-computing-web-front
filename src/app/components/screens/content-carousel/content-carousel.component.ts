import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '../../../types/phase-data';
import { phases } from '../../../../assets/data/phase';
import { ActivatedRoute } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TextComponent } from '../text/text.component';
import { VideoComponent } from '../video/video.component';
import { PhasesPresentationComponent } from '../phases-presentation/phases-presentation.component';
import { QuestionsPresentationComponent } from '../questions-presentation/questions-presentation.component';
import { QuestionComponent } from '../question/question.component';
import { CongratulationsComponent } from '../congratulations/congratulations.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-content-carousel',
  standalone: true,
  imports: [
    CommonModule,
    ImageComponent,
    MatIconModule,
    TextComponent,
    VideoComponent,
    PhasesPresentationComponent,
    QuestionsPresentationComponent,
    QuestionComponent,
    CongratulationsComponent,
  ],
  templateUrl: './content-carousel.component.html',
  styleUrl: './content-carousel.component.scss',
})
export class ContentCarouselComponent implements OnInit {
  currentIndex: number = 0;

  contents: Content[] = [];
  phaseId: any;
  phaseTitle: any;
  totalQuestions: any;

  informationScreens = [
    'phasePresentation',
    'questionsPresentation',
    'congratulation',
  ];

  isFirst = true;
  isLast = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.phaseId = id;
      this.phaseTitle = phases.filter(
        (phase) => (phase.id = Number(id))
      )[0].title;
      this.contents = phases.filter(
        (phase) => (phase.id = Number(id))
      )[0].contents;
    });

    const myCarousel = document.getElementById('carouselExampleCaptions');

    myCarousel?.addEventListener('slide.bs.carousel', (event: any) => {
      this.currentIndex = event['to'];
      this.isFirst = this.currentIndex === 0;
      this.isLast = this.currentIndex === this.contents.length - 1;
    });

    this.totalQuestions = this.contents.filter(
      (content) => content.type === 'question'
    ).length;
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
}
