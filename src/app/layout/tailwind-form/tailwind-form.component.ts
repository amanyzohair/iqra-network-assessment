import { QuestionsService } from './../../core/services/questions.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { FieldValidators, Question } from '../../shared/models/questions.model';
import { emailAsyncValidator } from '../../shared/validators/validators';
import { FormStore } from '../../shared/store/form/form.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tailwind-form',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './tailwind-form.component.html',
  styleUrl: './tailwind-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TailwindFormComponent implements OnInit, OnDestroy {
  readonly store = inject(FormStore);
  form = computed<FormGroup>(() => {
    if (!this.store.loaded()) return new FormGroup({});
    return this.buildForm();
  });
  get formValue() {
    return this.form()?.value || {};
  }
  @Output() formValueChanged: EventEmitter<FormData> = new EventEmitter();

  private destroy$: Subject<boolean> = new Subject();
  successMessage: string | null = null;
  formSub?: Subscription;
  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService
  ) {
    effect(() => {
      if (this.store.loaded()) {
        this.form()
          .valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$))
          .subscribe((resp) => {
            this.formValueChanged.emit(this.form()?.value);
          });

        let formData: FormData;
        const storageData = localStorage.getItem('applicationFormData');
        if (storageData) {
          formData = JSON.parse(storageData);
          formData ? this.form().patchValue(formData) : null;
          console.log('formData', formData);
        }

        // this.handelValueChange();
      }
    });
  }
  ngOnInit() {}

  buildForm(): FormGroup {
    let group: any = {};
    this.store.questions().forEach((question) => {
      if (question.type === 'fieldgroup') {
        let subGroup: any = {};
        question?.sub_questions?.forEach((subQues) => {
          let validators: ValidatorFn[] = this.createValidators(subQues);
          subGroup[subQues.label] = new FormControl(
            '',
            validators,
            subQues.type === 'email'
              ? emailAsyncValidator(this.questionsService)
              : null
          );
        });
        group[question.label] = this.fb.array([this.fb.group(subGroup)]);
      } else {
        let validators: ValidatorFn[] = this.createValidators(question);
        group[question.label] = new FormControl(
          '',
          validators,
          question.type === 'email'
            ? emailAsyncValidator(this.questionsService)
            : null
        );
      }
    });
    return this.fb.group(group);
  }
  getFormArray(name: string): FormArray {
    return (this.form()?.get(name) as FormArray) || [];
  }
  createValidators(question: Question): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if (question.mandatory) validators.push(Validators.required);
    if (question.validators?.length > 0) {
      question.validators.forEach((validator) => {
        const [validatorName, validatorValue] = Object.entries(validator)[0];
        switch (validatorName) {
          case FieldValidators.EMAIL:
            validators.push(Validators.email);
            break;
          case FieldValidators.PATTERN:
            validators.push(Validators.pattern(`${validatorValue}`));
            break;
          case FieldValidators.MIN:
            validators.push(Validators.min(Number(validatorValue)));
            break;
          case FieldValidators.MAX:
            validators.push(Validators.max(Number(validatorValue)));
            break;
          case FieldValidators.MINLENGTH:
            validators.push(Validators.minLength(Number(validatorValue)));
            break;
          case FieldValidators.MAXLENGTH:
            validators.push(Validators.maxLength(Number(validatorValue)));
            break;
          default:
            console.warn(`Unknown validator: ${validatorName}`);
            break;
        }
      });
    }
    return validators;
  }
  addFieldGroup(question: Question) {
    let group: any = [];
    let array = this.getFormArray(question.label);
    question?.sub_questions?.forEach((subQues) => {
      let validators: ValidatorFn[] = this.createValidators(subQues);

      group[subQues.label] = new FormControl(
        '',
        validators,
        subQues.type === 'email'
          ? emailAsyncValidator(this.questionsService)
          : null
      );
    });
    array.push(this.fb.group(group));
  }
  removeFieldGroup(question: Question, index: number) {
    let array = this.getFormArray(question.label);
    array.removeAt(index);
  }
  submit() {
    console.log('Form submitted successfully!', this.form()?.value);
    this.successMessage = 'Form submitted successfully!';

    setTimeout(() => {
      this.successMessage = null;
    }, 5000);
  }
  handelValueChange() {
    this.formSub = this.form()?.valueChanges.subscribe((values: FormData) => {
      this.formValueChanged.emit(values);

      console.log('values', values);
    });
    if (this.form()) this.formValueChanged.emit(this.form()?.value); // For displaying the fields titles once initiated
  }
  checkValue() {
    console.log('adaddaa', this.formValue());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.formSub?.unsubscribe();
  }
}
