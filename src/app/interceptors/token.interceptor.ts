import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/user/authentication.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const token = auth.getToken();

  if (token) {
    if (auth.isTokenExpired(token)) {
      return next(req);
    }

    req = req.clone({
      setHeaders: { Authorization: 'Bearer ' + token }
    });
  }
  
  return next(req);
};
