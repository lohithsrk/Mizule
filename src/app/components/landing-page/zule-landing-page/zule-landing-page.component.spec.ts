import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuleLandingPageComponent } from './zule-landing-page.component';

describe('ZuleLandingPageComponent', () => {
  let component: ZuleLandingPageComponent;
  let fixture: ComponentFixture<ZuleLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZuleLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZuleLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
