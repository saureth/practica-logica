import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoDosComponent } from './modo-dos.component';

describe('ModoDosComponent', () => {
  let component: ModoDosComponent;
  let fixture: ComponentFixture<ModoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
