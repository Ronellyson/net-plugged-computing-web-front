import { Component, Input } from '@angular/core';
import { PhaseCardComponent } from '../phase-card/phase-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-phase-card-list',
  standalone: true,
  imports:[
    PhaseCardComponent,
    NgFor
  ],
  templateUrl: './phase-card-list.component.html',
  styleUrls: ['./phase-card-list.component.scss']
})
export class PhaseCardListComponent{
  @Input() phases: { number: number, title: string, description: string }[] = [];
}
