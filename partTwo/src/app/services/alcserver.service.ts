import {Injectable} from '@angular/core';
import {Observable, Subject, ReplaySubject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {AlcMessage, AlcwebsocketService, webSocketState} from "./alcwebsocket.service";
import {LoggerService as Logger} from '../services/logger.service'

export enum alcServerState {
  Down = 0,
  Up = 1,
  Starting = 2,
  Stopping = 3
}

const iconStateArray = [
  "warn",
  "primary",
  "warn",
  "warn"
]


@Injectable({
  providedIn: 'root'
})

export class AlcserverService{
  private _state: alcServerState = alcServerState.Down;
  public serverState$: Subject<alcServerState> = new Subject();
  /**
   * ALC. Producer of websocket client Id
   * @private
   */
  private _wsClientIdObservable : Observable<string> = this._websocket_service.systemMsg$.pipe(
    filter(v=>v.body["clientId"] && (v.source == 0)),
    map(v=>v.body["clientId"].toString())
  );
  /**
   * ALC. The subject to subscribe for websocket client Id
   */
  public wsClientId$: ReplaySubject<string> = new ReplaySubject<string>(1);

  /**
   * ALC. Producer of websocket pong Id
   * @private
   */
  private _wsPongObservable : Observable<number> = this._websocket_service.systemMsg$.pipe(
    filter(v=>v.body["pong"] ),
    map(v=>v.body["pong"])
  );

  /**
   * ALC. The subject to subscribe for websocket pong Id
   */
  public wsPongId$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private _websocket_service: AlcwebsocketService
  ) {
    Logger.log('[alcserver.service] _websocket_service.getInstanceId()=', this._websocket_service.getInstanceId());
    Logger.log('[alcserver.service] _websocket_service.getState()=', this._websocket_service.getState())
    //ALC. subsribe to websocket state updates
    this._websocket_service._state$.subscribe((v) => {
      Logger.log('[alcserver.service] _websocket_service._state$ received', v)
      let state: alcServerState;
      switch (v) {
        case webSocketState.connected :
          this.setServerState(alcServerState.Up);
          break;
        case webSocketState.disconnected :
          this.setServerState(alcServerState.Down);
          break;
      }
    })
    //ALC.subsribe to websocket server sleep/resume events
    this._websocket_service.systemMsg$.subscribe((v) => {
      Logger.log('[alcserver.service] _websocket_service.systemMsg$ reveived', v);
      if (v.body && v.body["message"] && (typeof v.body["message"] == "string")) {
        const pattern = /^sleep=(sleep|resume)/i;
        let match = v.body["message"].match(pattern)?v.body["message"].match(pattern)[1]:"NONE"
        switch (match.toUpperCase()) {
          case "SLEEP":
            this.setServerState(alcServerState.Down);
            break;
          case "RESUME" :
            this.setServerState(alcServerState.Up);
            break;
        }
      }
      if (v.body && v.body["pong"]) {
        this.setServerState(alcServerState.Up);
      }
    })
    //ALC. subscribe to wsClientId updates
    this._wsClientIdObservable.subscribe((v:string)=>this.wsClientId$.next(v));

    //ALC. subscribe to wsClientId pong events
    this._wsPongObservable.subscribe((v:number)=>this.wsPongId$.next(v));
  }


  public setServerState = (state:alcServerState):void=>{
    this._state=state
    this.serverState$.next(this._state);
  }

  /**
   * ALC. map _state to state icon [disabled] = true/false
   */
  public stateForIcon = this.serverState$.pipe(
    map(v=>iconStateArray[v])
  )
}



