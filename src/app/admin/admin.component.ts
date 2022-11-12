import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.userService.logout()
      .then(() => {
          Swal.fire({
            icon: 'success',
            background: 'transparent',
            text: 'Bye master',
            color: 'white',
            showConfirmButton: false,
            timer: 1600
          }).then(r => {
            this.router.navigate(['/']);
          })
        }
      )
      .catch(error => console.log(error));
  }

}
