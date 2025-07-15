import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TodoItem } from './todos.model';

type TodosState = {
  todos: TodoItem[];
};

const initalState: TodosState = {
  todos: [],
};
export const TodosStore = signalStore(
  //   { providedIn: 'root' },
  withState(initalState),
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
