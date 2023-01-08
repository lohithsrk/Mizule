import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuroraBgComponent } from './aurora-bg.component';

describe('AuroraBgComponent', () => {
  let component: AuroraBgComponent;
  let fixture: ComponentFixture<AuroraBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuroraBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuroraBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
