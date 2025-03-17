import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../core/models/questions';
import { QuestionsService } from '../core/services/questions.service';
import { TailwindFormComponent } from './tailwind-form/tailwind-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TailwindFormComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  questions$!: Observable<Question[]>;
  values?: {};
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
}
