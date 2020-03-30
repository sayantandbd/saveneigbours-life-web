import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private _utilityService:UtilityService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(!!this._utilityService.getToken())
    {
      request = request.clone({

        setHeaders: {
          Authorization: 'Bearer '+ this._utilityService.getToken()
        }
      });
    }
    
    return next.handle(request);
  }
}