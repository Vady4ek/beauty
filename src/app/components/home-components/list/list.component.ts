import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from 'src/ts/interfaces';
import { ItemComponent } from 'src/app/components/home-components/item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items!: Item[];

  constructor() { }

  ngOnInit(): void {
  }

}
