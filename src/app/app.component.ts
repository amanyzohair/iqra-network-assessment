import { Component } from '@angular/core';
import { TailwindFormComponent } from './layout/tailwind-form/tailwind-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TailwindFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iqra-network-assessment';
}
