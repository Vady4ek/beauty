import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AccordionService } from 'src/app/store/accordion.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [style({ height: 0 }), animate(400)]),
      transition(':leave', [animate(400, style({ height: 0 }))]),
    ]),
  ],
})
export class TabComponent implements OnInit {
  @Input() name: string = '';
  @Input() initialOpen: boolean = false;
  @Input() isOpen = false;
  @Output() clickTab: EventEmitter<boolean> = new EventEmitter();

  constructor(private accordionService: AccordionService) {}

  ngOnInit(): void {
    this.isOpen = this.initialOpen;

    this.accordionService.accordionSubject.subscribe(
      {
        // next: (n) => 
      }
    );
  }

  toggleTab() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.accordionService.accordionSubject.next(true);
    }
  }
}
