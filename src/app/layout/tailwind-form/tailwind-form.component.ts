import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, take } from 'rxjs';
import { Question } from '../../core/models/questions';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-tailwind-form',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './tailwind-form.component.html',
  styleUrl: './tailwind-form.component.scss',
})
export class TailwindFormComponent implements OnInit, OnDestroy {
  @Input() questions$!: Observable<Question[]>;
  @Output() formValueChanged: EventEmitter<FormData> = new EventEmitter();

  form!: FormGroup;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.questions$.pipe(take(1)).subscribe((resp: Question[]) => {
      this.form = this.buildForm(resp);
      this.handelValueChange();
    });
  }

  buildForm(questions: Question[]): FormGroup {
    let group: any = {};
    questions.forEach((question) => {
      if (question.type === 'fieldgroup') {
        let subGroup: any = {};
        question?.sub_questions?.forEach((subQues) => {
          subGroup[subQues.label] = new FormControl(
            '',
            subQues.mandatory ? Validators.required : null
          );
        });
        group[question.label] = this.fb.array([this.fb.group(subGroup)]);
      } else {
        group[question.label] = new FormControl(
          '',
          question.mandatory ? Validators.required : null
        );
      }
    });
    return this.fb.group(group);
  }
  getFormArray(name: string): FormArray {
    return (this.form?.get(name) as FormArray) || [];
  }
  addFieldGroup(question: Question) {
    let group: any = [];
    let array = this.getFormArray(question.label);
    question?.sub_questions?.forEach((subQues) => {
      group[subQues.label] = new FormControl(
        '',
        subQues.mandatory ? Validators.required : null
      );
    });
    array.push(this.fb.group(group));
  }
  removeFieldGroup(question: Question, index: number) {
    let array = this.getFormArray(question.label);
    array.removeAt(index);
  }
  submit() {
    console.log('values', this.form?.getRawValue());
  }
  handelValueChange() {
    this.form?.valueChanges.subscribe((values: FormData) => {
      this.formValueChanged.emit(values);
    });
    if (this.form) this.formValueChanged.emit(this.form.value); // For displaying the fields titles once initiated
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
