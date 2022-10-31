import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])

  onClick(target: EventTarget) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit(true);
    }
  }

}