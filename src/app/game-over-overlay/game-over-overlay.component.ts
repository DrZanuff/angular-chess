import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-over-overlay',
  standalone: true,
  templateUrl: './game-over-overlay.component.html',
  styleUrls: ['./game-over-overlay.component.css'],
})
export class GameOverOverlayComponent {
  @Input() message: string = 'Game ends with a: Check Mate';

  restartGame(): void {
    window.location.reload();
  }
}
