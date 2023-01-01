import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, from, Observable, of, throwError} from "rxjs";
import { environment } from '../../environments/environment';
export const gwEndpoint = environment.gwEndpoint;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient/*, urlWol?: string*/) {
    // this.urlWol = urlWol;
  }
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text' ,
    withCredentials?: boolean,
  } = {
  }

  urlWol: string = "https://alexcloud.myqnapcloud.com:8081/alcwol.php";

  //Http Client get method
  public getWol(v:number): Observable<any> {
    let url: string = this.urlWol;
    if (v<1) { url = 'http://alexcloud.myqnapcloud.com:8081/alcwol.php'}; //ALC. HTTP must fail on HTTPS server
    let obs: Observable<any> = this.http.get<any>(url);
    return obs;
  }
}
