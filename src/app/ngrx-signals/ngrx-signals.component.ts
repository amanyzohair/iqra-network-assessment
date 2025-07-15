import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngrx-signals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-signals.component.html',
  styleUrl: './ngrx-signals.component.scss',
})
export class NgrxSignalsComponent {
  tasks = [
    { title: 'Buy milk', completed: false },
    { title: 'Read a book', completed: true },
  ];
}
