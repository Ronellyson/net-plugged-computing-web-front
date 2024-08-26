import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { SafeUrlPipe } from '../../../pipes/safe-url-pipe.pipe';

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
export class VideoComponent {
  @Input() phaseNumber: number | undefined;
  @Input() title: string | undefined;
  @Input() url: string | undefined;
  @Input() contentText: string | undefined;
}
