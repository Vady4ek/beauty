import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [style({ height: 0 }), animate('400ms ease')]),
      transition(':leave', [animate('400ms ease', style({ height: 0 }))]),
    ]),
  ],
})
export class TabComponent implements OnInit {
  @Input() name = '';
  @Input() isOpen = false;

  @Output() closeTabs: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.isOpen = false;
  }

  open() {
    this.closeTabs.emit();
    this.isOpen = true;
  }
}
