import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, NgForm} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import * as AuthActions from "../../../../AngularRecipes/src/app/auth/store/auth.actions";
import * as fromApp from "../../../../AngularRecipes/src/app/store/app.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }


  ngOnInit(): void {

  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));


    authForm.reset();
    /*this.userService.login(this.formLogin.value)
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
      );*/
  }
}
