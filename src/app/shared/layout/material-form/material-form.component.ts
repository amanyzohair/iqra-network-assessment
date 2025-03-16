import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Question } from '../../../core/models/questions';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss',
})
export class MaterialFormComponent implements OnInit {
  @Input() questions$!: Observable<Question[]>;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.questions$.pipe(take(1)).subscribe((resp: Question[]) => {
      console.log('resp', resp);
      this.form = this.buildForm(resp);

      console.log('form', this.getFormArray('Hobbies'));
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
    return (this.form.get(name) as FormArray) || [];
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
    console.log('values', this.form.getRawValue());
  }
}
