import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
