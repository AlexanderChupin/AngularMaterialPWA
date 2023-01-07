import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import {
  Observable,
  timer,
  Subject,
  EMPTY,
  of,
  throwError,
  retry,
  takeWhile,
  interval,
  range,
  take,
  pipe,
  OperatorFunction
} from 'rxjs';
import {
  retryWhen,
  tap,
  delayWhen,
  switchAll,
  catchError,
  delay,
  takeUntil,
  map,
  concatAll,
  concatMap
} from 'rxjs/operators';
import {InstanceIdService} from "./instance-id.service";
import {LoggerService as Logger} from "./logger.service";
import {
  AlcRxjsToolsService,
  intAttempts_gateway,
  intRetries_gateway,
  msecDelay_gateway
} from "./alc-rxjs-tools.service";
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
  private _status: string;
  private reconnection$: Observable<number> = range(1, intRetries_gateway*intAttempts_gateway).
  pipe(
    //takeWhile((v, index) => index < intRetries_gateway*intAttempts_gateway && !this.socket$),
    concatMap((v,i)=>of(v).pipe(
      delayWhen((v)=>this._reconnectDelay$.pipe(delay(v*msecDelay_gateway)))),
    ), //msecDelay_gateway
  );


  private _reconnectDelay$: Subject<any> = new Subject<any>();
  constructor(
    private instanceIdService: InstanceIdService,
    private alcRxjsToolsService: AlcRxjsToolsService) {
    this._alcInstId =  instanceIdService.getNextId();
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

    // ToDo: introduce delay and max number of attempts between consecutive retries using timer() observable
    const messages = this.socket$.pipe(
      tap({
        next: v => {
          Logger.log('ALC.socket$ next', v)},
        error: error => {
          let eStr = JSON.stringify(error);
          Logger.warn('ALC.socket$ error', error)},
        complete: () => {
          Logger.log('ALC.socket$ complete')},
      }),
      /*cfg.reconnect ? */this.reconnect() /*: o => o*/,
      catchError(_ =>
          EMPTY
        //throwError('ALC. messages error')
      ))
    //toDO only next an observable if a new subscription was made double-check this
    this.messagesSubject$.next(messages);
    }
  }
  private _subsReconnection = this.reconnection$.
  subscribe({
    next:(v)=>this.connect({ reconnect: true }),
    error:()=>{
      this._status = 'retry_failed';
    },
    complete:()=>{
      this._status = 'retry_completed';
    }
  });
  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect() : OperatorFunction<any, any>{
    return pipe(
      retryWhen(errors => errors.pipe(
        tap({
          next:val => console.log('[Data Service] Try to reconnect', val),
          error: (err) =>{
            let a=1
          },
          complete: ()=>{
            let a=1;
          }}
        ),
        delayWhen(_ => timer(5000)))));
  }
  /*private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      //delay(RECONNECT_INTERVAL+3000),
      retry({
        count:3,
        delay: (errors,counter) =>
          /!*errors.pipe(
            tap(
              val => Logger.log('[Data Service] Try to reconnect', val)),
            catchError(err => of(1)), //throwError(()=> new Error('ALC. [DataService] error notifier for reconnect'))
            delayWhen(v => timer(RECONNECT_INTERVAL + 3000))
          )*!/
          timer(RECONNECT_INTERVAL+3000)
      })
    );
  }*/

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
          this._status = 'connected';
        }
      },
      closeObserver: {
        next: (e: CloseEvent) => {
          Logger.warn('[DataService]: connection closed = ', e);
          // this.socket$.complete(); // ALC. makes no sense because all observers are already disconnected at this moment
          // this.socket$ = undefined;
          // Создаем interval со значением из reconnectInterval
          // this.reconnection$ =
          //   interval(msecDelay_gateway)
          //     .pipe(takeWhile((v, index) => index < intRetries_gateway*intAttempts_gateway && !this.socket$));
          // setTimeout(()=>this.connect({ reconnect: true }),RECONNECT_INTERVAL+3000);
          /*let obslRetryWS = this.alcRxjsToolsService.getObsRetries(msecDelay_gateway,intAttempts_gateway,intRetries_gateway)
            .pipe(
              takeUntil(timer(30000)),
              catchError(err=>
                EMPTY
              )
            );
          obslRetryWS.subscribe(()=>this.connect({ reconnect: true }))*/
          // timer(2000).subscribe(()=>this.connect({ reconnect: true }));

          // this._status==='retrying'?this._reconnectDelay$.next(1):null;
          // this._reconnectDelay$.next(1);
          // timer(3000).subscribe(()=>this.connect({ reconnect: true }))
          this.connect({ reconnect: true })
        }
      }
    });
  }

}
