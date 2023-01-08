import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMobBarComponent } from './navigation-mob-bar.component';

describe('NavigationMobBarComponent', () => {
  let component: NavigationMobBarComponent;
  let fixture: ComponentFixture<NavigationMobBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationMobBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationMobBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
