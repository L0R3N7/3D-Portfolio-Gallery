import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitonListComponent } from './exhibiton-list.component';

describe('ExhibitonListComponent', () => {
  let component: ExhibitonListComponent;
  let fixture: ComponentFixture<ExhibitonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
