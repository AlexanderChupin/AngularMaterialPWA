import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, from, Observable, of, throwError} from "rxjs";
import { environment } from '../../environments/environment';
import {tap} from "rxjs/operators";
export const gwEndpoint = environment.gwEndpoint;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient/*, urlWol?: string*/) {
    // this.urlWol = urlWol;
  }
  options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } = {
    observe: 'body',
    responseType:'json'
  }

  urlWol: string = gwEndpoint;

  //Http Client get method
  public getWol(v:number): Observable<any> {
    let url: string = this.urlWol;
    if (v<1) { url = 'http://alexcloud.myqnapcloud.com:8081/alcwol.php'}; //ALC. HTTP must fail on HTTPS server
    let obs: Observable<any> = this.http.get<any>(url,this.options);
    return obs;
  }
}
