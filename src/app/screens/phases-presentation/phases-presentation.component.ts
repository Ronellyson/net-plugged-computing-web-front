import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-phases-presentation',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule
  ],
  templateUrl: './phases-presentation.component.html',
  styleUrls: ['./phases-presentation.component.scss']
})
export class PhasesPresentationComponent {
  @Input() phaseTitle: string = 'asdasd';
  @Input() phaseNumber: number = 1;
  @Input() showAngularIcon: boolean = true;

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['/home']);
  }
}
