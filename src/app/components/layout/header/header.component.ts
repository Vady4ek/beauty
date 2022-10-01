import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HashStringService } from 'src/app/store/hash-string.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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

  constructor(private hashString: HashStringService) {}

  ngOnInit(): void {
    if (!this.user.avatarUrl) {
      const str = `${this.user.name}${this.user.surname}`;

      this.avatarColor = this.hashString.getHSL(str);
    }
  }

  toggleAuth() {
    this.authOpen = !this.authOpen;
  }
}
