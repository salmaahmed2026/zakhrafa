import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isNamesMenuOpen = signal(false);
  isWordsMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleNamesMenu() {
    this.isWordsMenuOpen.set(false);
    this.isNamesMenuOpen.update(v => !v);
  }

  toggleWordsMenu() {
    this.isNamesMenuOpen.set(false);
    this.isWordsMenuOpen.update(v => !v);
  }
  
  closeAllMenus() {
    this.isMenuOpen.set(false);
    this.isNamesMenuOpen.set(false);
    this.isWordsMenuOpen.set(false);
  }
}