import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeObrePageComponent } from './home-obre-page.component';

describe('HomeObrePageComponent', () => {
  let component: HomeObrePageComponent;
  let fixture: ComponentFixture<HomeObrePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeObrePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeObrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
