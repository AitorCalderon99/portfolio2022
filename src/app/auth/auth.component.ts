import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

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
    private store: Store<fromApp.AppState>,
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      //Redirect to admin if logged
      if (!!authState.user) {
        this.router.navigate(['/admin']);
      }


      this.error = authState.authError;
      if (this.error) {
        Swal.fire({
          icon: 'error',
          title: this.translateService.instant('auth.suspicious'),
          text: this.error,
          background: '#F4F6F7'
        }).then(r => {
        })
      }
    });
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      await Swal.fire({
        icon: "error",
        text: this.translateService.instant('auth.suspicious'),
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
