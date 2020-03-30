import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaQuizComponent } from './corona-quiz.component';

describe('CoronaQuizComponent', () => {
  let component: CoronaQuizComponent;
  let fixture: ComponentFixture<CoronaQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
