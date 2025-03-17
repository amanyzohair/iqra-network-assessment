import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../shared/models/questions.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>('assets/db/questions.json');
  }
  getEmails(): Observable<string[]> {
    return this.httpClient.get<string[]>('assets/db/emails.json');
  }
}
