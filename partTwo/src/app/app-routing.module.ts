import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthGuard } from './auth/unauth.guard';
import {SqlComponent} from "./sql/sql.component";
import {SqlMultiComponent} from "./sql-multi/sql-multi.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
//import { Router } from '@angular/router';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    {
      path: 'signin',
      component: SignInComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'signup',
      component: SignUpComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'confirm',
      component: ConfirmCodeComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }
  ]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'manage', canActivate: [AuthGuard],children: [
      { path: 'sql', component: SqlComponent,
        canActivate: [AuthGuard]
      },
      { path: 'sql1', component: SqlComponent,
        canActivate: [AuthGuard]
      },
      { path: 'sql-multi', component: SqlMultiComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  //ALC. https://angular.io/guide/router#setting-up-wildcard-routes
  { path: '**', component: PageNotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
