import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrlPipe } from '../../../pipes/safe-url-pipe.pipe';
import { YouTubePlayer } from '@angular/youtube-player';
import { YoutubePlayerService } from '../../../services/youtube-player.service';

@Component({
  selector: 'app-video-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SafeUrlPipe,
    YouTubePlayer
  ],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() phaseNumber: number | undefined;
  @Input() phaseTitle: string | undefined;
  @Input() videoId: string | undefined;
  @Input() contentText: string | undefined;

  @ViewChild(YouTubePlayer, { static: true }) youtubePlayer!: YouTubePlayer;

  videoWidth: number = 320;
  videoHeight: number = 240;

  constructor(private youtubePlayerService: YoutubePlayerService) {}

  ngOnInit() {
    this.setVideoDimensions();
    this.youtubePlayerService.setPlayer(this.youtubePlayer);
  }

  @HostListener('window:resize')
  onResize() {
    this.setVideoDimensions();
  }

  setVideoDimensions() {
    if (window.innerWidth >= 768) {
      this.videoWidth = 640;
      this.videoHeight = 480;
    } else {
      this.videoWidth = 320;
      this.videoHeight = 240;
    }
  }

  play() {
    this.youtubePlayerService.playVideo();
  }

  pause() {
    this.youtubePlayerService.pauseVideo();
  }
}
