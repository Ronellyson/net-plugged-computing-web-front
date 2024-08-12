import { Component, OnInit } from '@angular/core';
import { PhaseCardComponent } from '../phase-card/phase-card.component';
import { NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';

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
export class PhaseCardListComponent implements OnInit {
  phases: { number: number; title: string}[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPhases();
  }

  loadPhases(): void {
    this.dataService.getPhases().subscribe(phases => {
      this.phases = phases.map(phase => ({
        number: phase.id,
        title: phase.title,
      }));
    });
  }
}
