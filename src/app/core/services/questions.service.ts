import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>('assets/db/questions.json');
  }
}
