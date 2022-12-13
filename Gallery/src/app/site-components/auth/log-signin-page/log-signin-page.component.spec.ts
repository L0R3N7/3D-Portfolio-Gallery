import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSigninPageComponent } from './log-signin-page.component';

describe('LogSigninPageComponent', () => {
  let component: LogSigninPageComponent;
  let fixture: ComponentFixture<LogSigninPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogSigninPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogSigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
