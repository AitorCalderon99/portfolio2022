import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  active = false;

  constructor() { }

  toggleNav() {
    this.active = !this.active;
  }


}
