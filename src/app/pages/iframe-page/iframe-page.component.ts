import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NgxChessBoardView, NgxChessBoardModule } from 'ngx-chess-board';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chess } from 'chess.js';

type CurrentPlayer = {
  isCurrentPlayerTurn: boolean;
  currentPlayerColor: 'w' | 'b';
};

type PostMessagePayload = {
  source: string;
  event: 'pieceMoved';
  fen: string;
};

@Component({
  selector: 'app-iframe-page',
  standalone: true,
  imports: [NgxChessBoardModule],
  templateUrl: './iframe-page.component.html',
  styleUrl: './iframe-page.component.css',
})
export class IframePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chessBoard', { static: false }) chessBoard!: NgxChessBoardView;
  player: number = 1;
  lightDisabled: boolean = false;
  darkDisabled: boolean = true;
  frameCurrentStateClassName: string = 'player-inactive';
  private routeSubscription!: Subscription;
  private onMessage = (event: MessageEvent) => this.onMessageReceived(event);

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
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.player = Number(params['player']) || 1;
    });

    window.addEventListener('message', this.onMessage);
  }

  ngAfterViewInit(): void {
    this.chessBoard.setFEN(
      '4k1n1/p1p2pp1/P1n2P1B/2bp4/3Pp2P/2Kb4/3r4/1r6 b - - 0 1'
    );
    this.updatePlayerState();

    if (this.player === 2) {
      this.chessBoard.reverse();
      this.cdr.detectChanges();
    }
  }

  onPieceMoved(_: any): void {
    this.updatePlayerState();

    const fen = this.chessBoard.getFEN();

    const targetIframeId = this.player === 1 ? 'iframe2' : 'iframe1';
    const targetIframe = window.parent.document.getElementById(
      targetIframeId
    ) as HTMLIFrameElement;

    if (targetIframe && targetIframe.contentWindow) {
      const payload: PostMessagePayload = {
        source: `iframe${this.player}`,
        event: 'pieceMoved',
        fen,
      };

      targetIframe.contentWindow.postMessage(payload, '*');
    }
  }

  onMessageReceived(event: MessageEvent): void {
    const payload = event.data as PostMessagePayload;

    if (
      payload?.event === 'pieceMoved' &&
      payload?.source !== `iframe${this.player}`
    ) {
      this.chessBoard.setFEN(payload.fen);
      if (this.player === 2) {
        this.chessBoard.reverse();
      }
      // Let's make a Check mate or a Stale here
      this.updatePlayerState();
      this.checkForEndGame();
    }
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
  }

  checkForEndGame(): void {
    const fen = this.chessBoard.getFEN();
    const chess = new Chess(fen);

    if (chess.in_checkmate()) {
      this.darkDisabled = true;
      this.lightDisabled = true;
      window.parent.postMessage({
        event: 'gameEnded',
        reason: 'checkMate',
        message: 'Game ends with a: Check Mate',
      });
    }

    if (chess.in_stalemate()) {
      this.darkDisabled = true;
      this.lightDisabled = true;
      window.parent.postMessage({
        event: 'gameEnded',
        reason: 'staleMate',
        message: 'Game ends with a: Stale Mate',
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    window.removeEventListener('message', this.onMessage);
  }
}
