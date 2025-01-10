import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverOverlayComponent } from './game-over-overlay.component';

describe('GameOverOverlayComponent', () => {
  let component: GameOverOverlayComponent;
  let fixture: ComponentFixture<GameOverOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOverOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
