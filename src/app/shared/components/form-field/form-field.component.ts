import { name } from '@leichtgewicht/ip-codec';
import { Component, forwardRef, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Question } from '../../../core/models/questions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched($event.target.value)',
  },
})
export class FormFieldComponent {
  @Input() field!: Question;
  onChange = (_: any) => {};
  onTouched = () => {};
  fileName?: string;

  public formControl: FormControl = new FormControl();

  constructor() {}

  writeValue(value: any) {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  uploadEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileName = file.name;
      let newFile = {
        upload: reader.result,
        name: file.name,
      };
    };
  }
}
