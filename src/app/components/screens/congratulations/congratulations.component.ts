import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-congratulations',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss'],
})
export class CongratulationsComponent implements OnInit {
  @Input() phaseTitle: string | undefined;
  @Input() phaseNumber: number | undefined;
  @Input() totalErrors: number = 0;
  @Input() totalQuestions: number = 0;

  congratulations_message = '';
  starsArray: number[] = [];

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.congratulations_message = `Parabéns por ter completado a fase ${this.phaseNumber}. Aqui está sua pontuação:`;
    this.calculateStars();
  }

  calculateStars(): void {
    if (this.totalQuestions > 0) {
      const errorPercentage = this.totalErrors / this.totalQuestions;
      const maxStars = 5;
      // Calcula o número de estrelas, garantindo um mínimo de 1 estrela
      const stars = Math.max(1, Math.round((1 - errorPercentage) * maxStars));
      this.starsArray = Array(stars).fill(0);
    }
  }

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }

  navigateBack() {
    this.location.back();
  }
}
