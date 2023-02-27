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
  concatMap, switchMap, filter
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

export enum webSocketState {
  disconnected = 0,
  connected = 1,
  websocket_created= 2,
}

export enum AlcMessageType {
  system = 0, //used internally to handle statuses, ping-pong
  client = 1 //used for business logic
}

/**
 * message mandatory fields
 * @source - client number, 0 for server
 * @body - json object
 */
export interface AlcMessage {
  type: AlcMessageType,
  source: number,
  body: object;
}

@Injectable({
  providedIn: 'root'
})
export class AlcwebsocketService implements OnDestroy {
  //ToDo add tslint rule for unsubscribe from all subscriptions
  private _notifierUnsubscribeAll$: Subject<null> = new Subject(); //common notifier to unsubscribe from all subscriptions
  private _socket$: WebSocketSubject<any>;
  // ALC. direct _socket$ processor with connection retry logic
  private _messages: Observable<any>;
  private _messagesSubject$ = new Subject();
  // ALC. subject!!! required to keep permanent connection of different components. Emitting content messages to content subscribers
  public messages$: Subject<AlcMessage> = new Subject<AlcMessage>()
  // ALC. observable to switch for new websocket stream after reconnect
  private _messagesSwitched: Observable<any> = this._messagesSubject$.pipe(
    switchAll(),
    catchError(e => {
      throw e
    })
  );

  //ALC. required for mocking in tests
  public setMessages$(subj:Subject<AlcMessage>){
    this.messages$ = subj;
  }

  /**
   * ALC filtered system messages from websocket
   */
  systemMsg$ : Observable<AlcMessage> = this.messages$.pipe(
    filter(v=>v.type==AlcMessageType.system),
    tap({
      next: v => {
        let a = 1;
      },
      error: e => {
        let a = 1;
      },
      complete: () => {
        let a = 1;
      }
    })/*,
    filter((v:any,i:number) => {
      (typeof ({'system'} = v) === 'number')})*/
  )
  private _alcInstId: number;
  //ALC. connection state. Only for debugging purpose
  private _state: string = 'disconnected';
  private _wsClientId: number = null;
  getWsClientId = () : number => this._wsClientId;
  setWsClientId = (v: number) : void => {this._wsClientId=v};
  /**
   * ALC. public informer on _state update
   */
  public _state$: Subject<webSocketState> = new Subject<webSocketState>();
  //ALC. manual push from Angular button.
  private _clicks = new Subject();

  /**
   * ALC. initiates single reconnect attempt
   * @private
   */
  private _reconnectCounter$: Subject<any> = new Subject<any>();
  /**
   * ALC. notifier to complete reconnect cycle. Setting _state = 'connected'
   * @private
   */
  private _reconnectCounterComplete$: Subject<any> = new Subject<any>();
  private _subsMessagesSwitched: Subscription;
  private _subsSystemMsg$: Subscription;

  constructor(
    private instanceIdService: InstanceIdService,
    private alcRxjsToolsService: AlcRxjsToolsService) {
    this._alcInstId = instanceIdService.getNextId();
    this._reconnectCounterComplete$
      .pipe(takeUntil(this._notifierUnsubscribeAll$))
      .subscribe(() => this.connected())
    this.createWebScoket();
  }

  /**
   * AKC. lunched with connection to the websocket server is established
   */
  connected = () => {
    this._state = 'connected';
    this._state$.next(webSocketState.connected);
  }

  /**
   * ALC. tap() to debug _reconnectCounter
   * @private
   * @debugObsle string name of observable to display in the log
   */
  private _debugObserver = (debugObsle: string): Observer<any> => {
    return {
      next: (v) => Logger.log(`[alcwebsocket.service] ${debugObsle} next = `, v), //this.connect({ reconnect: true })
      error: (err) => {
        Logger.warn(`[alcwebsocket.service] ${debugObsle} error = `, err)
      },
      complete: () => {
        Logger.warn(`[alcwebsocket.service] ${debugObsle} complete`);
      }
    }
  };

  //ALC. ping-pong intervals
  private _ping = interval(environment.ping_pong_websocket_timeout);
  // ALC. intermediate observable to lunch reconnect cycle
  private _recycleFromClick$ = this._clicks.pipe(
    takeUntil(this._notifierUnsubscribeAll$),
    switchMap((x) => this._reconnectCounter.pipe(
      takeUntil(this._notifierUnsubscribeAll$),
      //ALC. reset reconnect cycle when websocket connection is established
      takeUntil(this._reconnectCounterComplete$),
      tap(this._debugObserver('_recycleFromClick$'))
      )
    )
  );

  // ALC. intermediate observable to ping-pong reconnect cycle
  private _pingFromRecycle = this._recycleFromClick$.pipe(
    takeUntil(this._notifierUnsubscribeAll$),
    switchMap((x) => this._ping.pipe(
      takeUntil(this._notifierUnsubscribeAll$),
      tap(this._debugObserver('_pingFromRecycle'))
      )
    )
  );
  //private _obsReconnectNewCycle = merge(this._recycleFromClick$,this._pingFromRecycle).pipe(tap(this._debugObserver('_obsReconnectNewCycle')));
  /**
   * ALC. Observer for the manual connection attempt
   * @param v the attempt number within a reconnection cycle
   */
  private _obsrRecycleFromClick = (v): void => {
    this.wsReset();
    this.connect();
  }
  /**
   * ALC. Observer for the ping. If connected already just get pong response from the server
   * @param v the number of a ping-pong event
   */
  private _obsrPingFromRecycle = (v): void => {
    if (this._state == 'connected') {
      let msg : AlcMessage = {
        'type': AlcMessageType.system,
        'source':this.getWsClientId(),
        'body': {'ping':v}
      };
      //let jsonString = 'ping';
      this.sendMessage(msg);
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
  private _reconnectCounter: Observable<number> = range(0, environment.intRetries_websocket * environment.intAttempts_websocket - 1).pipe(
    takeUntil(this._notifierUnsubscribeAll$),
    // ALC. delay the single reconnect attempt
    concatMap((v, i) => of(v).pipe(
      delayWhen((v) => this._reconnectCounter$.pipe(
        takeUntil(this._notifierUnsubscribeAll$),
        delay(v * environment.msecDelay_websocket),
        ),
      )),
    ),
    tap(this._debugObserver('_reconnectCounter')),
  );

  /**
   * Creates a new WebSocket subject(once during init), connects to server (by sending it to the messages subject)
   * @param cfg {reconnect:true} to subscribe to new reconnect cycle and connect to server
   */
  public connect(cfg: { reconnect: boolean } = {reconnect: false}): void {
    /*//ALC. create new _socket$ only once during service init. Retry logic is implemented in next blocks.
    if (!this._socket$ || this._socket$.closed || !this._messages) {
      this._socket$ = this.getNewWebSocket();

      // ToDo: introduce delay and max number of attempts between consecutive retries using timer() observable
      this._messages = this._socket$.pipe(
        // takeUntil(this._notifierUnsubscribeAll$),
        tap(this._debugObserver('_socket$')),
        /!*cfg.reconnect ? this.reconnect() : o => o,*!/
        //retry({delay:2000}),
        catchError(_ =>
          EMPTY
        ))
      this._state = 'websocket_created';
      this._state$.next(webSocketState.websocket_created);
      //ALC. always wait for new reconnection cycle or ping-pong. Subscribe once during the service init
      this._recycleFromClick$.subscribe(this._obsrRecycleFromClick);
      this._pingFromRecycle.subscribe(this._obsrPingFromRecycle);
      this._messagesSwitched.subscribe((v:any)=>this.messages$.next(v));
      this.onRecycle();
      return;
    }*/

    //toDO only next an observable if a new subscription was made double-check this
    this._messagesSubject$.next(this._messages);
  }

  close() {
    this._socket$ ? this._socket$.complete() : null;
    this._socket$ = undefined;
  }

  sendMessage(msg: AlcMessage) {
    // const tmp = {"data": msg};
    this._socket$.next(msg);
  }

  getInstanceId(): number {
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
          // this._state = 'connected';
          Logger.log('[alcwebsocket.service]: _state = connected');
          this._reconnectCounterComplete$.next(null);
        }
      },
      closeObserver: {
        next: (e: CloseEvent) => {
          Logger.warn('[alcwebsocket.service] connection closed = ', e);
          let prev_state = this._state;
          this._state = 'disconnected';
          this._state$.next(webSocketState.disconnected);
          // ALC if was connected before then start new connection cycle
          if (prev_state == 'connected') {
            this._clicks.next(0);
          }
          (e.code == 1000) ? null : this._reconnectCounter$.next(null);
        }
      }
    });
  }

  ngOnDestroy() {
    this.close();
    this._notifierUnsubscribeAll$.next(null);
    this._notifierUnsubscribeAll$.complete();
    Logger.log('[alcwebsocket.service] is destroyed');
  }

  /**
   * ALC. initiates new connection cycle. After connection cycle completes pinging server
   */
  onRecycle() {
    this._clicks.next(0);
    this._reconnectCounter$.next(null);
  }

  getState = (): string => this._state;

  /**
   * ALC open new WebScoket and create reconnection logic
   * @private
   */
  private createWebScoket() {
    //ALC. create new _socket$ only once during service init. Retry logic is implemented in next blocks.
    this._socket$ = this.getNewWebSocket();

    // ToDo: introduce delay and max number of attempts between consecutive retries using timer() observable
    this._messages = this._socket$.pipe(
      // takeUntil(this._notifierUnsubscribeAll$),
      // tap(this._debugObserver('_socket$')),
      /*cfg.reconnect ? this.reconnect() : o => o,*/
      //retry({delay:2000}),
      catchError(_ =>
        EMPTY
      ))
    this._state = 'websocket_created';
    this._state$.next(webSocketState.websocket_created);
    //ALC. always wait for new reconnection cycle or ping-pong. Subscribe once during the service init
    this._recycleFromClick$.subscribe(this._obsrRecycleFromClick);
    this._pingFromRecycle.subscribe(this._obsrPingFromRecycle);
    this._subsMessagesSwitched = this._messagesSwitched.subscribe((v: any) => this.messages$.next(v));
    this._subsSystemMsg$ = this.systemMsg$.subscribe((v:any)=>{
      if (v.type == AlcMessageType.system && v.body && v.body.clientId){
        this._wsClientId = v.body.clientId;
      }
      Logger.log('[alcserver.service] websocket system message =',v)
    });
    this.onRecycle();
  }

  //ALC. reset websocket by getting new client id
  public wsReset = ()=>{
    this._subsMessagesSwitched.unsubscribe();
    this._subsMessagesSwitched= this._messagesSwitched.subscribe((v: any) => this.messages$.next(v));
  }
}
