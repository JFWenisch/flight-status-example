import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flight } from '../shared/flight';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FlightStatusRequest } from './flight-status-request';
import { FlightStatusResponse } from './flight-status-response';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  // Define API
  apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  searchFlight(request: FlightStatusRequest): Observable<any> {
    return this.http
      .post<FlightStatusResponse>(
        this.apiURL + '/employees',
        JSON.stringify(request),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
    }
      handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }
}
