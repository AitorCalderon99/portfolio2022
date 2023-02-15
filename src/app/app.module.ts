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
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminComponent} from './admin/admin.component';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {StoreModule} from "@ngrx/store";
import * as fromApp from './store/app.reducer';
import {AuthModule} from "./auth/auth.module";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/store/auth.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";


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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    CommonModule,
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
