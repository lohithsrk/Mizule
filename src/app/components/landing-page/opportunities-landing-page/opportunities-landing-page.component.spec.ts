import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesLandingPageComponent } from './opportunities-landing-page.component';

describe('OpportunitiesLandingPageComponent', () => {
  let component: OpportunitiesLandingPageComponent;
  let fixture: ComponentFixture<OpportunitiesLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitiesLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
