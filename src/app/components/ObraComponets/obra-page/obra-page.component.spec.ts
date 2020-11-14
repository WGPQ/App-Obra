import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraPageComponent } from './obra-page.component';

describe('ObraPageComponent', () => {
  let component: ObraPageComponent;
  let fixture: ComponentFixture<ObraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
