import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe.pipe';

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
  @Input() phaseNumber$!: Observable<number>;
  @Input() topicName$!: Observable<string | undefined>;
  @Input() url$!: Observable<string | undefined>;
  @Input() contentText$!: Observable<string | undefined>;
}
