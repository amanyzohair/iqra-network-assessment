import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuestionsService } from './questions.service';
import { Question } from '../../shared/models/questions.model';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuestionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch questions', () => {
    const mockQuestions: Question[] = [
      {
        label: 'Email',
        type: 'email',
        mandatory: true,
        id: '123',
        validators: [],
        sub_questions: [],
      },
      {
        label: 'Phone',
        type: 'phone',
        mandatory: true,
        id: '125',
        validators: [],
        sub_questions: [],
      },
    ];

    service.getQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne('assets/db/questions.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockQuestions);
  });
});
