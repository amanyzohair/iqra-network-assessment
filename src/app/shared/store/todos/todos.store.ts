import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoItem } from './todos.model';
import { computed } from '@angular/core';

type TodosState = {
  todos: TodoItem[];
};

const initalState: TodosState = {
  todos: [],
};
export const TodosStore = signalStore(
  //   { providedIn: 'root' },
  withState(initalState),
  withComputed(({ todos }) => ({
    completedTodos: computed(() => {
      return todos().filter((todo) => todo.completed)?.length;
    }),
  })),
  withMethods((store) => ({
    addTodo(todoTitle: string) {
      patchState(store, {
        todos: [
          { id: Date.now().toString(), title: todoTitle, completed: false },
          ...store.todos(),
        ],
      });
    },
    toggleTodo(todoId: string) {
      patchState(store, {
        todos: store
          .todos()
          .map((item) =>
            item.id === todoId ? { ...item, completed: !item.completed } : item
          ),
      });
    },
  }))
);
