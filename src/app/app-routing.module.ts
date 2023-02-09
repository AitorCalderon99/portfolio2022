import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WorkComponent} from "./work/work.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {AdminComponent} from "./admin/admin.component";
import {canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'work', component: WorkComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: AdminComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/user']))
  },
  {
    path: 'user', loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule)
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
