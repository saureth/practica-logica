import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoUnoComponent } from './modo-uno.component';

describe('ModoUnoComponent', () => {
  let component: ModoUnoComponent;
  let fixture: ComponentFixture<ModoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
