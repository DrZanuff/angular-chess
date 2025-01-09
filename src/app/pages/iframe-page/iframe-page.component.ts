import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NgxChessBoardView, NgxChessBoardModule } from 'ngx-chess-board';
import { ActivatedRoute } from '@angular/router';

type CurrentPlayer = {
  isCurrentPlayerTurn: boolean;
  currentPlayerColor: 'w' | 'b';
};

@Component({
  selector: 'app-iframe-page',
  standalone: true,
  imports: [NgxChessBoardModule],
  templateUrl: './iframe-page.component.html',
  styleUrl: './iframe-page.component.css',
})
export class IframePageComponent implements OnInit, AfterViewInit {
  @ViewChild('chessBoard', { static: false }) chessBoard!: NgxChessBoardView;
  player: number = 1;
  lightDisabled: boolean = false;
  darkDisabled: boolean = true;
  frameCurrentStateClassName: string = 'player-inactive';

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  private getCurrentPlayer(fen: string, currentPlayer: number): CurrentPlayer {
    const currentTurn = fen.split(' ')?.[1];
    const currentPlayerColor = currentPlayer === 1 ? 'w' : 'b';
    return {
      isCurrentPlayerTurn: currentTurn === currentPlayerColor,
      currentPlayerColor,
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.player = Number(params['player']) || 1;
    });
  }

  ngAfterViewInit(): void {
    this.updatePlayerState();

    if (this.player === 2) {
      this.chessBoard.reverse();
      this.cdr.detectChanges();
    }
  }

  onPieceMoved(event: any): void {
    console.log('Piece moved:', event);
    this.updatePlayerState();
  }

  updatePlayerState() {
    const fen = this.chessBoard.getFEN();
    const { currentPlayerColor, isCurrentPlayerTurn } = this.getCurrentPlayer(
      fen,
      this.player
    );

    if (this.player === 1) {
      if (currentPlayerColor === 'w') {
        this.lightDisabled = false;
        this.darkDisabled = true;
      } else {
        this.lightDisabled = true;
        this.darkDisabled = true;
      }
    } else if (this.player === 2) {
      if (currentPlayerColor === 'b') {
        this.lightDisabled = true;
        this.darkDisabled = false;
      } else {
        this.lightDisabled = true;
        this.darkDisabled = true;
      }
    }

    this.frameCurrentStateClassName = isCurrentPlayerTurn
      ? 'player-active'
      : 'player-inactive';

    this.cdr.detectChanges();

    console.log('DBG:', {
      fen: this.chessBoard.getFEN(),
      player: this.player,
      currentPlayerColor,
    });
  }
}
