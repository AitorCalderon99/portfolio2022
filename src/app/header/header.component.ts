import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuService} from "../shared/menu.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  lang = 'EN';

  @ViewChild('asName') asName: ElementRef | undefined;
  logoVisible = false;

  toggleNav() {
    this.menuService.toggleNav();
  }
  constructor(public menuService: MenuService, private renderer: Renderer2, public translate: TranslateService) {
    this.translate.currentLang = this.translate.defaultLang;
  }

  toggleLang() {
    if (this.translate.currentLang === 'es') {
      this.translate.use('en');
      this.lang = 'ES';
    } else {
      this.translate.use('es');
      this.lang = 'EN';
    }
  }

}
