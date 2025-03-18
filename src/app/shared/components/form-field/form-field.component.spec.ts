import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Question } from '../../models/questions.model';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldComponent,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
      ],
      providers: [
        {
          provide: NgControl,
          useValue: {
            control: new FormControl(),
            valueAccessor: null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      id: '123',
      label: 'test',
      type: 'text',
      validators: [''],
      sub_questions: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the formControl', () => {
    expect(component.formControl).toBeTruthy();
  });
  it('should update the formControl value when writeValue is called', () => {
    component.writeValue('test value');
    expect(component.formControl.value).toBe('test value');
  });
  it('should disable the formControl when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    expect(component.formControl.disabled).toBeTrue();
  });
  it('should display validation errors', () => {
    component.formControl.setErrors({ required: true });
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-red-700');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('This field is required.');
  });
});
