import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss']
})
export class OrderButtonComponent implements OnInit {
  @Input() type = 'button';
  @Input() arrow = true;
  @Input() arrowRight = true;
  @Input() small = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
