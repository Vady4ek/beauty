import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from 'src/ts/interfaces/item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  
  @Input() itemInfo!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
