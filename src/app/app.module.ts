import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BackgroundRainDirective } from './shared/background-rain.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BackgroundRainDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
