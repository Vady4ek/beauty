import { Component, OnInit, Input, Output, ElementRef, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  standalone: true,
  host: {
    '(document:keydown)': 'onKeyUp($event)',
  },
  imports: [CommonModule, ClickOutsideDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => DropDownComponent
      ),
      multi: true
    }
  ]
})
export class DropDownComponent implements OnInit, ControlValueAccessor {
  @Output() selectOption = new EventEmitter<void>();

  @Input() options: string[] = [];
  @Input() hasError!: boolean;
  @Input() placeholder = 'Select from list';

  changed!: (value: string) => void;
  touched!: () => void;

  isDisabled = false;
  isOpen = false;

  value = '';
  optionIndex = -1;

  constructor(private el: ElementRef) { }

  writeValue(newValue: string): void {
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

  ngOnInit(): void { }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.el.nativeElement.querySelector('button').focus();
    this.touched();
  }

  onClickOutside() {
    if (this.isOpen) {
      this.close();
    }
  }

  focus(index: number) {
    const elements: HTMLLIElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('li')
    );

    elements.forEach((el) => el.classList.remove('active'));
    elements[index].classList.add('active');

    this.optionIndex = index;
  }

  select(index: number) {
    this.value = this.options[index];

    this.changed(this.options[index]);

    this.focus(index);

    this.close();

    this.selectOption.emit();
  }

  onKeyUp(e: KeyboardEvent) {
    if (this.isOpen) {
      if (e.code === 'ArrowUp') {
        e.preventDefault();

        if (this.optionIndex < 0) {
          this.optionIndex = 0;
        } else if (this.optionIndex > 0) {
          this.optionIndex--;
        }

        this.focus(this.optionIndex);
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();

        if (this.optionIndex < 0) {
          this.optionIndex = 0;
        } else if (this.optionIndex < this.options.length - 1) {
          this.optionIndex++;
        }

        this.focus(this.optionIndex);
      } else if (e.code === 'Enter') {
        if (this.optionIndex >= 0) {
          e.preventDefault();

          this.select(this.optionIndex);
        }
      } else if (e.code === 'Escape') {
        this.close();
      }
    }
  }
}