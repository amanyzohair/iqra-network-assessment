import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { QuestionsService } from '../../../core/services/questions.service';
import { inject } from '@angular/core';
import { catchError, pipe, switchMap, tap, throwError } from 'rxjs';
import { Question } from '../../models/questions.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
type FormState = {
  questions: Question[];
  loading: boolean;
  loaded: boolean;
  email?: string;
  phone?: string;
  name?: string;
  salary?: string;
  gender?: 'female' | 'male';
};
const formInitialState: FormState = {
  questions: [],
  loading: false,
  loaded: false,
  email: '',
  phone: '',
  name: '',
  salary: '',
  gender: undefined,
};
export const FormStore = signalStore(
  withState(formInitialState),
  //   withHooks({
  //     onInit(store) {},
  //   }),
  withMethods((store, questionsServ = inject(QuestionsService)) => ({
    loadQuestions: rxMethod(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true });
          return questionsServ.getQuestions().pipe(
            tapResponse({
              next: (resp) => {
                console.log('resp', resp);

                patchState(store, {
                  questions: resp,
                });
              },
              error: () => {},
              finalize: () => {
                patchState(store, {
                  loading: false,
                  loaded: true,
                });
              },
            })
          );
        })
      )
    ),
    setFormData() {},
  })),
  withHooks({
    onInit(store) {
      store.loadQuestions({});
    },
  })
);
