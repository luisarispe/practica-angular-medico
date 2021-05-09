import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  url: string = '';

  constructor() {
    const theme = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute('href', theme);
  }
  changeTheme(theme: string) {

    this.url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', this.url);
    localStorage.setItem('theme', this.url);
    this.checkCurrentTheme();
  }
  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });

  }
}
