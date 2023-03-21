import {Component} from '@angular/core';
import {MenuService} from "./shared/menu.service";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import {Store} from "@ngrx/store";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio2022';

  constructor(private store: Store<fromApp.AppState>, public menuService: MenuService, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
