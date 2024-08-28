import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YouTubePlayer } from '@angular/youtube-player';

@Injectable({
  providedIn: 'root',
})
export class YoutubePlayerService {
  private player: YouTubePlayer | null = null;
  private playerReadySubject = new BehaviorSubject<boolean>(false);

  playerReady$ = this.playerReadySubject.asObservable();

  setPlayer(player: YouTubePlayer) {
    this.player = player;
    this.playerReadySubject.next(true);
  }

  playVideo() {
    if (this.player) {
      this.player.playVideo();
    }
  }

  pauseVideo() {
    if (this.player) {
      this.player.pauseVideo();
    }
  }

  stopVideo() {
    if (this.player) {
      this.player.stopVideo();
    }
  }

  seekTo(seconds: number, allowSeekAhead: boolean) {
    if (this.player) {
      this.player.seekTo(seconds, allowSeekAhead);
    }
  }
}
