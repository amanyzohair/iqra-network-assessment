import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionsService } from '../../core/services/questions.service';

export function emailAsyncValidator(
  questionService: QuestionsService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return questionService.getEmails().pipe(
      map((response) => {
        return response.includes(control.value) ? { emailExists: true } : null;
      })
    );
  };
}
