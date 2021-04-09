import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Base Http Communication Service. Includes core definitions of http method.
 * When create the custom service, use it as singleton object. Thx to Dependency Injection.
 */
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(
        environment.API_BASE_PATH + path,
        { headers: this.getHttpHeaders(), params }
      ).pipe(catchError(this.formatError));
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(
      environment.API_BASE_PATH + path,
      JSON.stringify(body),
      { headers: this.getHttpHeaders() }
    ).pipe(catchError(this.formatError));
  }

  postResponseBufferData(path: string, body: any): Observable<any> {
    return this.http.post(
      environment.API_BASE_PATH + path,
      JSON.stringify(body),
      { headers: this.getHttpHeaders(), responseType: 'arraybuffer' }
    ).pipe(catchError(this.formatError));
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(
      environment.API_BASE_PATH + path,
      JSON.stringify(body),
      { headers: this.getHttpHeaders() }
    ).pipe(catchError(this.formatError));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(
      environment.API_BASE_PATH + path,
      { headers: this.getHttpHeaders(), params }
    ).pipe(catchError(this.formatError));
  }

  private formatError(error: any) {
    return of(error);
  }

  private getHttpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
