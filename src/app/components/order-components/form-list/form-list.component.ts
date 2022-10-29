import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
