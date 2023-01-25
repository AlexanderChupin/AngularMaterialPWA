import {Injectable, OnDestroy} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import {
  Observable,
  Subject,
  EMPTY,
  of,
  interval,
  range,
  Observer, Subscription
} from 'rxjs';
import {
  tap,
  delayWhen,
  switchAll,
  catchError,
  delay,
  takeUntil,
  concatMap, switchMap
} from 'rxjs/operators';
import {InstanceIdService} from "./instance-id.service";
import {LoggerService as Logger} from "./logger.service";
import {
  AlcRxjsToolsService,
} from "./alc-rxjs-tools.service";
// [ng\-realtime\-dashboard/environment\.ts at master · lamisChebbi/ng\-realtime\-dashboard](https://github.com/lamisChebbi/ng-realtime-dashboard/blob/master/src/environments/environment.ts)
export {LoggerService} from '../services/logger.service'
export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;

@Injectable({
  providedIn: 'root'
})
export class AlcwebsocketService implements OnDestroy {
  //ToDo add tslint rule for unsubscribe from all subscriptions
  notifierUnsubscribeAll: Subject<null> = new Subject(); //common notifier to unsubscribe from all subscriptions
  private socket$: WebSocketSubject<any>;
  // ALC. direct socket$ processor with connection retry logic
  private _messages: Observable<any>;
  private messagesSubject$ = new Subject();
  // ALC. observable to emit content messages to content subscribers
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => {
    throw e
  }));
  private _alcInstId: number;
  //ALC. connection state. Only for debugging purpose
  private _state: string;
  //ALC. manual push from Angular button.
  private _clicks = new Subject();

  /**
   * ALC. initiates single reconnect attempt
   * @private
   */
  private _reconnectCounter$: Subject<any> = new Subject<any>();
  /**
   * ALC. notifier to complete reconnect cycle
   * @private
   */
  private _reconnectCounterComplete$: Subject<any> = new Subject<any>();
  // ALC. subscription to _reconnectCounter
  private _subsReconnectCounter: Subscription;

  constructor(
    private instanceIdService: InstanceIdService,
    private alcRxjsToolsService: AlcRxjsToolsService) {
    this._alcInstId =  instanceIdService.getNextId();
  }

  /**
   * ALC. tap() to debug _reconnectCounter
   * @private
   * @debugObsle string name of observable to display in the log
   */
  private _debugObserver = (debugObsle: string): Observer<any> => {return {
    next:(v)=>Logger.log(`[alcwebsocket.service] ${debugObsle} next = `,v), //this.connect({ reconnect: true })
    error:(err)=>{
      Logger.warn(`[alcwebsocket.service] ${debugObsle} error = `,err)
    },
    complete:()=>{
      Logger.warn(`[alcwebsocket.service] ${debugObsle} complete`);
    }
  }};

  //ALC. ping-pong intervals
  private _ping = interval(environment.ping_pong_websocket_timeout);
  // ALC. intermediate observable to lunch reconnect cycle
  private _recycleFromClick$ = this._clicks.pipe(
    takeUntil(this.notifierUnsubscribeAll),
    switchMap((x)=>this._reconnectCounter.pipe(
      //ALC. reset reconnect cycle when websocket connection is established
      takeUntil(this._reconnectCounterComplete$),
      tap(this._debugObserver('_recycleFromClick$'))
      )
    )
  );

  // ALC. intermediate observable to ping-pong reconnect cycle
  private _pingFromRecycle = this._recycleFromClick$.pipe(
    takeUntil(this.notifierUnsubscribeAll),
    switchMap((x)=>this._ping.pipe(
      tap(this._debugObserver('_pingFromRecycle'))
      )
    )
  );
  //private _obsReconnectNewCycle = merge(this._recycleFromClick$,this._pingFromRecycle).pipe(tap(this._debugObserver('_obsReconnectNewCycle')));
  /**
   * ALC. Observer for the manual connection attempt
   * @param v the attempt number within a reconnection cycle
   */
  private _ObsrRecycleFromClick = (v):void =>{
      this.connect()
    }
  /**
   * ALC. Observer for the ping. If connected already just get pong response from the server
   * @param v the number of a ping-pong event
   */
  private _obsrPingFromRecycle = (v):void =>{
    if (this._state ==  'connected'){
      let jsonString = JSON.stringify({'type':'system','ping':v})
      //let jsonString = 'ping';
      this.sendMessage(jsonString);
      return;
    }
    this.connect()
  }
  //private _subsReconnectNewCycle: Subscription;
  /**
   * controlling reconnect attempts
   * emitting flag(counter number) to start websocket connection immediately.
   * next counter is ignited by _reconnectCounter$ and delayed by {number * environment.msecDelay_websocket} (msec)
   */
  private _reconnectCounter: Observable<number> = range(0, environment.intRetries_websocket*environment.intAttempts_websocket-1).
  pipe(
    takeUntil(this.notifierUnsubscribeAll),
    // ALC. delay the single reconnect attempt
    concatMap((v,i)=>of(v).pipe(
      delayWhen((v)=>this._reconnectCounter$.pipe(
        delay(v*environment.msecDelay_websocket),
        ),
      )),
    ),
    tap(this._debugObserver('_reconnectCounter')),
  );

  /**
   * Creates a new WebSocket subject(once during init), connects to server (by sending it to the messages subject)
   * @param cfg {reconnect:true} to subscribe to new reconnect cycle and connect to server
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    //ALC. create new socket$ only once during service init. Retry logic is implemented in next blocks.
    if (!this.socket$ || this.socket$.closed || !this._messages) {
      this.socket$ = this.getNewWebSocket();

      // ToDo: introduce delay and max number of attempts between consecutive retries using timer() observable
      this._messages = this.socket$.pipe(
        takeUntil(this.notifierUnsubscribeAll),
        tap(this._debugObserver('socket$')),
        /*cfg.reconnect ? this.reconnect() : o => o,*/
        //retry({delay:2000}),
        catchError(_ =>
          EMPTY
        ))
      this._state = 'websocket_created'
      //ALC. always wait for new reconnection cycle or ping-pong. Subscribe once during the service init
      this._recycleFromClick$.subscribe(this._ObsrRecycleFromClick);
      this._pingFromRecycle.subscribe(this._obsrPingFromRecycle);
      this.onRecycle();
      return;
    }

    //toDO only next an observable if a new subscription was made double-check this
    this.messagesSubject$.next(this._messages);
  }

  close() {
    this.socket$ ? this.socket$.complete() : null;
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
          this._state = 'connected';
          Logger.log('[alcwebsocket.service]: _state = ',this._state);
          this._reconnectCounterComplete$.next(null);
        }
      },
      closeObserver: {
        next: (e: CloseEvent) => {
          Logger.warn('[alcwebsocket.service] connection closed = ', e);
          let prev_state = this._state;
          this._state = 'disconnected';
          // ALC if was connected before then start new connection cycle
          if (prev_state == 'connected') {
            this._clicks.next(0);
          }
          (e.code == 1000 )?null:this._reconnectCounter$.next(null);
        }
      }
    });
  }

  ngOnDestroy() {
    this.close();
    this.notifierUnsubscribeAll.next(null);
    this.notifierUnsubscribeAll.complete();
    Logger.log('[alcwebsocket.service] is destroyed');
  }

  /**
   * ALC. initiates new connection cycle. After connection cycle completes pinging server
   */
  onRecycle() {
    this._clicks.next(0);
    this._reconnectCounter$.next(null);
  }
}
