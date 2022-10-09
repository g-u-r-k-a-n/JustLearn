import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        let errorMessage: string = "An error occured... ";

        if (!navigator.onLine) {
          errorMessage += "No internet connection! "
        }

        switch (response.status) {
          case 400:
            break;
          case 401:
            errorMessage += "You have not authorized! ";
            break;
          case 404:
            errorMessage += "No content! ";
            break;
          case 408:
            errorMessage += "Request timeout! ";
            break;
          case 500:
            errorMessage += "Internal error! ";
            break;
          default:
            errorMessage += "Unkown error! ";
            break;
        }

        if (!response.error.success) {
          errorMessage += response.error.status_message ? response.error?.status_message : "";
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
