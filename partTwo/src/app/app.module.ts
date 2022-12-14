import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IosInstallComponent } from './ios-install/ios-install.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CountryCodeSelectComponent } from './auth/country-code-select/country-code-select.component';
import { FilterPipe } from './auth/country-code-select/filter.pipe';
import { AuthService } from './auth/auth.service';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoaderComponent } from './loader/loader.component';
import { AvatarComponent } from './auth/profile/avatar/avatar.component';
import { SqlComponent } from './sql/sql.component';
// [HTTP get request example in Angular using HttpClient](https://www.angularjswiki.com/httpclient/get/)
import { HttpClientModule } from '@angular/common/http';
import {AlcwebsocketService} from "./services/alcwebsocket.service";
import { SqlMultiComponent } from './sql-multi/sql-multi.component';
import {InstanceIdService} from "./services/instance-id.service";
import {AlcRxjsToolsService} from './services/alc-rxjs-tools.service'
import {LoggerService} from './services/logger.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SignInComponent,
    IosInstallComponent,
    SignUpComponent,
    CountryCodeSelectComponent,
    FilterPipe,
    ConfirmCodeComponent,
    ProfileComponent,
    LoaderComponent,
    AvatarComponent,
    SqlComponent,
    SqlMultiComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  providers: [AuthService, AlcwebsocketService, InstanceIdService, AlcRxjsToolsService, LoggerService],
  bootstrap: [AppComponent],
  entryComponents: [
    IosInstallComponent,
    CountryCodeSelectComponent,
    LoaderComponent ]
})
export class AppModule { }
