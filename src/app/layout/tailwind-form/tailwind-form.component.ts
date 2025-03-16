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
import { Question } from '../../core/models/questions';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { QuestionsService } from '../../core/services/questions.service';

@Component({
  selector: 'app-tailwind-form',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './tailwind-form.component.html',
  styleUrl: './tailwind-form.component.scss',
})
export class TailwindFormComponent implements OnInit {
  questions!: Question[];
  form!: FormGroup;

  constructor(
    private questionsService: QuestionsService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.questionsService
      .getQuestions()
      .pipe(take(1))
      .subscribe((resp: Question[]) => {
        this.questions = resp;
        this.form = this.buildForm(resp);
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
