import { Component, OnInit } from '@angular/core';
import {MenuService} from "../shared/menu.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  closeNav() {
    this.menuService.toggleNav();
  }
}
