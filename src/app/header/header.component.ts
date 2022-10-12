import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameText = 'A';


  active = false;

  toggleNav() {
    this.active = !this.active;
    this.active ? this.nameText = 'Aitor Calderon' : this.nameText = 'A';

  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
