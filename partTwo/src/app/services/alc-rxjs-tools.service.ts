// ALC. coolection of RXJS functions and operators useful for retries

import { Injectable } from '@angular/core';
import {interval, mergeMap, throwError, of, retry, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

export const msecDelay_gateway = environment.msecDelay_gateway;
export const intAttempts_gateway = environment.intAttempts_gateway;
export const intRetries_gateway = environment.intRetries_gateway;

@Injectable({
  providedIn: 'root'
})

export class AlcRxjsToolsService {

  constructor() { };
  /**
   * ALC. [RxJS \- retry](https://rxjs.dev/api/operators/retry)
   * ALC. Generate observable with retries and delays
   * @param {msecDelay} delay in milliseconds in between attempts
   * @param {intAttempts} number of attempts in each retry. >=1
   * @param {intRetries} number of retries. >=1
   */
  public getObsRetries = (msecDelay: number, intAttempts: number, intRetries: number, ): Observable<any> => {
    const source: Observable<any> = interval(msecDelay);
    return source.pipe(
      mergeMap(val => val > intAttempts -1 ? throwError(() => 'Error! All retries are used. Try again') : of(val)),
      retry(intRetries-1) // retry 2 times on error
    );
  }
}
