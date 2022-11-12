import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WorkComponent} from "./work/work.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";
import {canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'work', component: WorkComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'user', component: AuthComponent,
  ...canActivate(() => redirectLoggedInTo(['/admin']))},
  {path: 'admin', component: AdminComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/user']))
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
