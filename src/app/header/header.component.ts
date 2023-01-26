import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuService} from "../shared/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('asName') asName: ElementRef | undefined;
  logoVisible = false;

  toggleNav() {
    this.menuService.toggleNav();
    this.changeLogo();

  }
  changeLogo(){
    /*this.logoVisible = !this.logoVisible
    let element = this.asName?.nativeElement;
    element.offsetWidth;
    let addOutStyle = 'animate__animated animate__bounce animate__delay-2s';
    addOutStyle.split(' ').forEach((className: string) => {
      this.renderer.addClass(element,className)
    });
    console.log(this.asName?.nativeElement)*/

  }

  constructor(public menuService: MenuService, private renderer: Renderer2) {
  }


}
