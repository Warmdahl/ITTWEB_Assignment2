import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import {AuthenticationService } from '../Services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const url = state.url;
            if(this.authService.isLoggedIn) {return true; }
            //Store the attempted URL for redirecting
            //this.authService.redirectUrl = url;
            //Navigate to the login page
            this.router.navigate(['/login']);
            return false;
        }
}