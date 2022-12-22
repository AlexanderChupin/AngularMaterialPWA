import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text' ,
    withCredentials?: boolean,
  }
  url: string = "https://alexcloud.myqnapcloud.com:8081/alcwol.php";

  //Http Client get method
  public getWol(): Observable<any> {
    // const url = 'https://reqres.in/api/users?page=1';
    return this.http.get<any>(this.url);
  }
}
