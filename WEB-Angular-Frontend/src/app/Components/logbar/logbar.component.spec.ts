import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbarComponent } from './logbar.component';

describe('LogbarComponent', () => {
  let component: LogbarComponent;
  let fixture: ComponentFixture<LogbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
