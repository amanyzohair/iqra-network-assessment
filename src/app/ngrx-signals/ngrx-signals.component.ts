import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosStore } from '../shared/store/todos/todos.store';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ngrx-signals',
  templateUrl: './ngrx-signals.component.html',
  styleUrl: './ngrx-signals.component.scss',
  imports: [CommonModule, FormsModule],
  providers: [TodosStore],
})
export class NgrxSignalsComponent implements OnInit {
  tasks = [];
  store = inject(TodosStore);
  title = signal('');
  ngOnInit(): void {}

  addTodoItem() {
    this.store.addTodo(this.title());
    this.title.set('');
  }
}
