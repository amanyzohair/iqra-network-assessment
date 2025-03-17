import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../shared/models/questions.model';
import { QuestionsService } from '../core/services/questions.service';
import { TailwindFormComponent } from './tailwind-form/tailwind-form.component';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TailwindFormComponent, CommonModule, NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  questions$!: Observable<Question[]>;
  formData?: FormData;

  constructor(private questionsService: QuestionsService) {}
  ngOnInit(): void {
    this.questions$ = this.questionsService.getQuestions();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  checkValue(value: any): [] {
    return value;
  }
  handleDataChanged(event: FormData) {
    this.formData = event;
  }
}
