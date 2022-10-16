import { Component } from '@angular/core';
import {MenuService} from "./shared/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio2022';

  constructor(public menuService: MenuService) {
  }
}
