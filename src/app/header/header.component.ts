import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../shared/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameText = 'A';
  active = false;


  toggleNav() {
    this.menuService.toggleNav();
    this.active = this.menuService.active;
    this.active ? this.nameText = 'Aitor Calderon' : this.nameText = 'A';

  }

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
   this.active = this.menuService.active;
  }

}
