import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { HashStringService } from 'src/app/store/hash-string.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [style({ height: 0 }), animate(400)]),
      transition(':leave', [animate(400, style({ height: 0 }))]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  public user = {
    name: 'Ruslan',
    surname: 'Filip',
    avatarUrl: undefined,
    // avatarUrl: 'assets/images/user.jpg',
  };

  public avatarColor!: string;
  public authOpen = false;
  public burgerOpen = false;

  constructor(
    private hashString: HashStringService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    if (!this.user.avatarUrl) {
      const str = `${this.user.name}${this.user.surname}`;

      this.avatarColor = this.hashString.getHSL(str);
    }
  }

  toggleAuth() {
    this.authOpen = !this.authOpen;
  }

  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;

    if(this.burgerOpen) {
      this.document.body.classList.add('scroll-lock');
    } else {
      this.document.body.classList.remove('scroll-lock');
    }
  }
}
