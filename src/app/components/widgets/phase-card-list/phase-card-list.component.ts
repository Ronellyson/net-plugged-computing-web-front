import { Component, OnInit } from '@angular/core';
import { PhaseCardComponent } from '../phase-card/phase-card.component';
import { NgFor } from '@angular/common';
import {Phase} from '../../../types/phase-data';
import { phases } from '../../../../assets/data/phase';

@Component({
  selector: 'app-phase-card-list',
  standalone: true,
  imports: [
    PhaseCardComponent,
    NgFor
  ],
  templateUrl: './phase-card-list.component.html',
  styleUrls: ['./phase-card-list.component.scss']
})
export class PhaseCardListComponent {
  phases: Phase[] = phases;
}
