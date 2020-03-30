import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseDetailsComponent } from './analyse-details.component';

describe('AnalyseDetailsComponent', () => {
  let component: AnalyseDetailsComponent;
  let fixture: ComponentFixture<AnalyseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
