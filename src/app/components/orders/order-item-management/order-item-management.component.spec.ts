import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemManagementComponent } from './order-item-management.component';

describe('OrderItemManagementComponent', () => {
  let component: OrderItemManagementComponent;
  let fixture: ComponentFixture<OrderItemManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
