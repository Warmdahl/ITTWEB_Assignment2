import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../Services/authentication.service';
import { ApiUsersService } from '../Services/api-users.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private userService: ApiUsersService
        ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Get the token from the service
        const authHeader = 'Bearer ' + this.authenticationService.getToken();
        //clone the request to add the new header.
        const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
        //pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
