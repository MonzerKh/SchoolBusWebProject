import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusCompanyListComponent } from './bus-company-list.component';

describe('BusCompanyListComponent', () => {
  let component: BusCompanyListComponent;
  let fixture: ComponentFixture<BusCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusCompanyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
