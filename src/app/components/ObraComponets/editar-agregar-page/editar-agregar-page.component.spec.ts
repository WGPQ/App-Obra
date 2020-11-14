import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarPageComponent } from './editar-agregar-page.component';

describe('EditarAgregarPageComponent', () => {
  let component: EditarAgregarPageComponent;
  let fixture: ComponentFixture<EditarAgregarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAgregarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAgregarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
