import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-mob-bar',
  templateUrl: './navigation-mob-bar.component.html',
  styleUrls: ['./navigation-mob-bar.component.css'],
})
export class NavigationMobBarComponent {
  isNavOpen: Boolean = false;
  openNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
