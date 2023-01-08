import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroLandingPageComponent } from './hero-landing-page.component';

describe('HeroLandingPageComponent', () => {
  let component: HeroLandingPageComponent;
  let fixture: ComponentFixture<HeroLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
