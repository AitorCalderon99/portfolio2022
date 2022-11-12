import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  formLogin: any;

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(() => {
          Swal.fire({
            icon: 'success',
            background: 'transparent',
            showConfirmButton: false,
            timer: 1300
          }).then(r => {
            this.router.navigate(['/admin']);
          })
        }
      )
      .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Suspicious...',
            text: 'Email or password incorrect',
            background: '#F4F6F7'
          }).then(r => {})
        }
      );
  }
}
