import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com'
  AUTH_TOKEN = 'auth_token'
  constructor(private http: HttpClient) { }

  get(url: string, params?: any): Observable<any> {
    const data = {params, headers: this.getAuthHeader()}
    return this.http
      .get(this.baseUrl + url, data)
      .pipe(
        catchError(HttpService.errorHandler.bind((this)))
      )
  }

  private static errorHandler(response: any) {
    const error = response.error
    console.log(error)
    const keys = Object.keys(error)
    const key = keys[0]
    let message = error[key]
    if (response.status === 401) {

    }
    if (error[key] instanceof Array) {
      message = error[key][0]
    }
    if (key === 'isTrusted') {

    } else {
      message = key + ' : ' + error
    }
    return throwError({message: message, error})
  }

  private getAuthHeader(): { [header: string]: string | string[]} {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`
    }
  }
}
