import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  error: string = null;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
      console.log(authState);
      if (this.error) {
        Swal.fire({
          icon: 'error',
          title: 'Suspicious...',
          text: this.error,
          background: '#F4F6F7'
        }).then(r => {})
      }
    });
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      await Swal.fire({
        icon: "error",
        text: "Please, fill the fields correctly",
        showConfirmButton: true,
      })
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(
      AuthActions.loginStart({email, password})
    );


    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
