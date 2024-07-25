import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingManagementComponent } from './blocking-management.component';

describe('BlockingManagementComponent', () => {
  let component: BlockingManagementComponent;
  let fixture: ComponentFixture<BlockingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockingManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
