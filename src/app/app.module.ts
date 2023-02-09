import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BackgroundRainDirective} from './shared/bacground-rain/background-rain.directive';
import {HomeComponent} from './home/home.component';
import {WorkComponent} from './work/work.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from "@angular/common";
import {NavigationComponent} from './navigation/navigation.component';
import {AuthComponent} from './auth/auth.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminComponent} from './admin/admin.component';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {StoreModule} from "@ngrx/store";
import * as fromApp from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BackgroundRainDirective,
    HomeComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent,
    NavigationComponent,
    AuthComponent,
    AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    FormsModule,
    ReactiveFormsModule,
    provideStorage(() => getStorage()),
    CommonModule,
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
