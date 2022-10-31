import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'app-order-input',
  standalone: true,
  imports: [CommonModule, NgxMaskModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderInputComponent),
      multi: true
    }
  ],
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss']
})
export class OrderInputComponent implements OnInit, ControlValueAccessor {
  @Output() dataChange: EventEmitter<void> = new EventEmitter();

  @Input() type = 'text';
  @Input() placeholder!: string;
  @Input() maskData = '';
  @Input() prefixData = '';
  @Input() typedData = false;
  @Input() hasError!: boolean;
  @Input() dropSpecialCharacters = true;
  @Input() isDisabled!: boolean;
  @Input() textArea = false;
  
  value = '';
  placeholderVisible = false;


  changed!: (changed: any) => {};
  touched!: () => {};

  constructor() { }

  ngOnInit(): void {
    if (!this.value) {
      this.placeholderVisible = true;
    }
  }

  writeValue(newValue: string) {
    this.value = newValue;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onFocus() {
    this.placeholderVisible = false;
  };

  onBlur() {
    this.touched();

    if (!this.value) {
      this.placeholderVisible = true;
    }
  }

  onInput() {
    this.changed(this.value);
    this.dataChange.emit();
  }
}
