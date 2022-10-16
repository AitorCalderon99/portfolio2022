import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../shared/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  toggleNav() {
    this.menuService.toggleNav();

  }

  constructor(public menuService: MenuService) {
  }


}
