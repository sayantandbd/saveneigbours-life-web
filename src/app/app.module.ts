import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './services/token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxUiLoaderModule } from  'ngx-ui-loader';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DefaultComponent } from './default/default.component';
import { AgmCoreModule } from '@agm/core';

// import { NgMasonryGridModule } from 'ng-masonry-grid';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule,
    FontAwesomeModule,
    // NgMasonryGridModule
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCKPAh1V0RmUcwP5m4oZoLsRljKU0kuPAs",
      libraries: ["places"]
    }),
  ],
  providers: [
    AuthGuard,
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
