import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-info.component.html',
  styleUrls: ['./all-info.component.scss']
})
export class AllInfoComponent implements OnInit {

  @Output() prev: EventEmitter<void> = new EventEmitter(); 
  @Output() submit: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }
}
