import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameOverOverlayComponent } from '../../game-over-overlay/game-over-overlay.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-page',
  imports: [GameOverOverlayComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  isGameOver = false;
  gameMessage = '';

  onMessageReceived(event: MessageEvent) {
    if (event.origin !== window.location.origin) {
      return;
    }

    if (event.data?.event === 'gameEnded') {
      this.isGameOver = true;
      this.gameMessage = event.data?.message || 'Game Ended!';
    }
  }

  ngOnInit(): void {
    window.addEventListener('message', this.onMessageReceived.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onMessageReceived.bind(this));
  }

  onGameEnded(message: string) {
    this.gameMessage = message;
  }
}
