import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Content, Phase } from '../../../types/phase-data';
import { phases } from '../../../../assets/data/phase';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageComponent } from "../image/image.component";

@Component({
  selector: 'app-content-carousel',
  standalone: true,
  imports: [
    CommonModule,
    ImageComponent
],
  templateUrl: './content-carousel.component.html',
  styleUrl: './content-carousel.component.scss'
})
export class ContentCarouselComponent implements OnInit {

  contens: Content[] = [];
  phaseId: any;

  constructor(private readonly activatedRoute: ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.phaseId = id;
      this.contens = phases.filter((phase) => phase.id = Number(id))[0].contents;
    });
  }

}
