import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUserManagementComponent } from './roles-user-management.component';

describe('RolesUserManagementComponent', () => {
  let component: RolesUserManagementComponent;
  let fixture: ComponentFixture<RolesUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesUserManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
