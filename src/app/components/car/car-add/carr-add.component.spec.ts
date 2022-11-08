import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrAddComponent } from './carr-add.component';

describe('CarrAddComponent', () => {
  let component: CarrAddComponent;
  let fixture: ComponentFixture<CarrAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
