import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '', component: AuthComponent,
        }]),
        TranslateModule
    ]
})
export class AuthModule {

}
