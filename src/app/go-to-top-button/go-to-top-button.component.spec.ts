import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToTopButtonComponent } from './go-to-top-button.component';

describe('GoToTopButtonComponent', () => {
  let component: GoToTopButtonComponent;
  let fixture: ComponentFixture<GoToTopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToTopButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
