import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginValidationComponent } from './login-validation.component';

describe('LoginValidationComponent', () => {
  let component: LoginValidationComponent;
  let fixture: ComponentFixture<LoginValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginValidationComponent]
    });
    fixture = TestBed.createComponent(LoginValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
