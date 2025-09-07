import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TailwindFormComponent } from './tailwind-form.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('TailwindFormComponent', () => {
  let component: TailwindFormComponent;
  let fixture: ComponentFixture<TailwindFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailwindFormComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TailwindFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Mock questions$ input
    // component.questions$ = of([
    //   {
    //     label: 'email',
    //     type: 'email',
    //     mandatory: true,
    //     id: '123',
    //     validators: [],
    //     sub_questions: [],
    //   },
    //   {
    //     label: 'phone',
    //     type: 'phone',
    //     mandatory: true,
    //     id: '125',
    //     validators: [],
    //     sub_questions: [],
    //   },
    //   {
    //     label: 'address',
    //     type: 'fieldgroup',
    //     id: '1277',
    //     validators: [],
    //     mandatory: false,
    //     sub_questions: [
    //       {
    //         label: 'street',
    //         type: 'text',
    //         mandatory: true,
    //         id: '12333',
    //         validators: [],
    //         sub_questions: [],
    //       },
    //       {
    //         label: 'city',
    //         type: 'text',
    //         mandatory: true,
    //         id: '1257',
    //         validators: [],
    //         sub_questions: [],
    //       },
    //     ],
    //   },
    // ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with dynamic controls', () => {
    expect(component.form()).toBeTruthy();
    expect(component.form().get('email')).toBeTruthy();
    expect(component.form().get('phone')).toBeTruthy();
  });

  it('should add a field group to the form', () => {
    const fieldGroup = {
      label: 'address',
      type: 'fieldgroup',
      id: '1277',
      validators: [],
      mandatory: false,
      sub_questions: [
        {
          label: 'street',
          type: 'text',
          mandatory: true,
          id: '12333',
          validators: [],
          sub_questions: [],
        },
        {
          label: 'city',
          type: 'text',
          mandatory: true,
          id: '1257',
          validators: [],
          sub_questions: [],
        },
      ],
    };
    component.addFieldGroup(fieldGroup);
    const addressArray = component.getFormArray('address');
    expect(addressArray.length).toBe(2);
  });
  it('should remove a field group from the form', () => {
    const fieldGroup = {
      label: 'address',
      type: 'fieldgroup',
      id: '1277',
      validators: [],
      mandatory: false,
      sub_questions: [
        {
          label: 'street',
          type: 'text',
          mandatory: true,
          id: '12333',
          validators: [],
          sub_questions: [],
        },
        {
          label: 'city',
          type: 'text',
          mandatory: true,
          id: '1257',
          validators: [],
          sub_questions: [],
        },
      ],
    };

    component.removeFieldGroup(fieldGroup, 0);
    const addressArray = component.getFormArray('address');
    expect(addressArray.length).toBe(0);
  });

  it('should submit the form if valid', () => {
    const spy = spyOn(console, 'log');
    component.submit();
    expect(spy).toHaveBeenCalledWith(
      'Form submitted successfully!',
      component.form().value
    );
  });
});
