import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaLoginComponent } from './corona-login.component';

describe('CoronaLoginComponent', () => {
  let component: CoronaLoginComponent;
  let fixture: ComponentFixture<CoronaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
