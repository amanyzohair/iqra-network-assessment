import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Question } from '../../core/models/questions';
import { QuestionsService } from '../../core/services/questions.service';
import { MaterialFormComponent } from './material-form/material-form.component';
import { TailwindFormComponent } from './tailwind-form/tailwind-form.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialFormComponent, TailwindFormComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  subscription: Subscription = new Subscription();
  questions$!: Observable<Question[]>;

  constructor(private questionsService: QuestionsService) {}
  ngOnInit(): void {
    this.questions$ = this.questionsService.getQuestions();
  }
}
