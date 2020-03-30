import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyLayoutComponent } from './emergency-layout.component';

describe('EmergencyLayoutComponent', () => {
  let component: EmergencyLayoutComponent;
  let fixture: ComponentFixture<EmergencyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
