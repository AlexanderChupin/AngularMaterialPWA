import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Auth from '@aws-amplify/auth';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _router: Router, public auth: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // ALC. [angular \- Angular2 \- Redirect to calling url after successful login \- Stack Overflow](https://stackoverflow.com/questions/40020703/angular2-redirect-to-calling-url-after-successful-login)
    let url: string = state.url;
    // Store the attempted URL for redirecting
    // Auth.configure() = url;
    return Auth.currentAuthenticatedUser().then(() => {
      // return this._router.navigate([url]);
      // this._router.navigate([url]);
      return true;
    })
      .catch(() => {
        this._router.navigate(['auth/signin'],{ queryParams: { redirect:url },queryParamsHandling: 'merge' });
        return false;
      })
  }
}
