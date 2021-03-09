import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { HTTP_INTERCEPTORS } from '@angular/common/http'


import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment} from './../environments/environment'
import { AuthInterceptor} from './auth.interceptor'

import * as Sentry from "@sentry/browser";


Sentry.init({
  dsn: 'https://460e17a0c05441af928e22fde96a8219@o545271.ingest.sentry.io/5666943'
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true // a cualquier peticion que llegue apliquele este interceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
