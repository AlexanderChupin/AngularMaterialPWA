import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import {Observable, timer, Subject, EMPTY, of} from 'rxjs';
import { retryWhen, tap, delayWhen, switchAll, catchError } from 'rxjs/operators';
import {InstanceIdService} from "./instance-id.service";
import {LoggerService as Logger} from "./logger.service";
// [ng\-realtime\-dashboard/environment\.ts at master · lamisChebbi/ng\-realtime\-dashboard](https://github.com/lamisChebbi/ng-realtime-dashboard/blob/master/src/environments/environment.ts)
export {LoggerService} from '../services/logger.service'
export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;


@Injectable({
  providedIn: 'root'
})
export class AlcwebsocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => {
    throw e
  }));
  private _alcInstId: number;
  constructor(private instanceIdService: InstanceIdService) {
    this._alcInstId =  instanceIdService.getNextId();
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      // ToDo: introduce delay and max number of attempts between consequteve retries using timer() observable
      const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
        tap({
          error: error => {
            Logger.warn(error)},
        }),
        catchError(_ =>
          EMPTY
        ))
      //toDO only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => Logger.log('[Data Service] Try to reconnect', val)),
      delayWhen(_ => timer(RECONNECT_INTERVAL)))));
  }

  close() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any) {
    const tmp = {"data":msg};
    this.socket$.next(tmp);
  }

  getInstanceId (): number{
    return this._alcInstId;
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket() {
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          Logger.log('[DataService]: connection ok');
        }
      },
      closeObserver: {
        next: (e: CloseEvent) => {
          let eStr = e.toString();
          Logger.warn('[DataService]: connection closed = ', e);
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        }
      }
    });
  }

}
