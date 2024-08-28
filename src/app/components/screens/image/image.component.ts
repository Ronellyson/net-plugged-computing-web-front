import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() phaseNumber: number | undefined;
  @Input() phaseTitle: string | undefined;
  @Input() image: string | undefined;
  @Input() contentText: string | undefined;
}
