import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../shared/models/questions.model';
import { QuestionsService } from '../core/services/questions.service';
import { TailwindFormComponent } from './tailwind-form/tailwind-form.component';
import { NgOptimizedImage } from '@angular/common';
import { FormStore } from '../shared/store/form/form.store';
import { watchState } from '@ngrx/signals';
@Component({
  selector: 'app-layout',
  imports: [TailwindFormComponent, CommonModule, NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [FormStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  // questions$ = signal<Question[]>([]);
  quest?: any;
  formData?: FormData;
  readonly store = inject(FormStore);
  constructor(private questionsService: QuestionsService) {}
  ngOnInit() {
    // this.questions$ = this.questionsService.getQuestions();
    // this.store.getQuestions();
    // this.quest = await this.store.loadQuestions({});
    // console.log('questin', this.quest);
    // watchState(this.store, console.log);
  }

  isArray(value: any): boolean {
    return value ? Array.isArray(value) : false;
  }
  checkValue(value: any): [] {
    return value;
  }
  handleDataChanged(event: FormData) {
    this.formData = event;
    localStorage.setItem('applicationFormData', JSON.stringify(this.formData));
  }
}
