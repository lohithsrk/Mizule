import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsFloatingComponent } from './socials-floating.component';

describe('SocialsFloatingComponent', () => {
  let component: SocialsFloatingComponent;
  let fixture: ComponentFixture<SocialsFloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialsFloatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialsFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
