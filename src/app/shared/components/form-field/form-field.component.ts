import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Question } from '../../models/questions.model';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  // host: {
  //   '(change)': 'onChange($event.target.value)',
  //   '(input)': 'onChange($event.target.value)',
  //   '(blur)': 'onTouched($event.target.value)',
  // },
})
export class FormFieldComponent implements ControlValueAccessor, OnInit {
  @Input() field!: Question;

  public formControl: FormControl = new FormControl();

  onChange = (_: any) => {};
  onTouched = () => {};
  fileName?: string;
  commonClasses: string =
    'bg-transparent placeholder-gray-600 focus:outline-none border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:border-blue-500 block py-2 px-2.5';
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.formControl = this.ngControl.control as FormControl;
    }
  }

  writeValue(value: any) {
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
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
