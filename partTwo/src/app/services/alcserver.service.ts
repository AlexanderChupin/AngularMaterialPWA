import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {AlcwebsocketService, webSocketState} from "./alcwebsocket.service";
import {LoggerService as Logger} from '../services/logger.service'

export enum alcServerState {
  Down = 0,
  Up = 1,
  Starting = 2,
  Stopping = 3
}

const iconStateArray = [
  false,
  true,
  true,
  false
]


@Injectable({
  providedIn: 'root'
})

export class AlcserverService{
  private _state: alcServerState = alcServerState.Down;
  public serverState$: Subject<alcServerState> = new Subject();

  constructor(
    private _websocket_service: AlcwebsocketService
  ) {
    Logger.log('[alcserver.service] _websocket_service.getInstanceId()=',this._websocket_service.getInstanceId());
    Logger.log('[alcserver.service] _websocket_service.getState()=',this._websocket_service.getState())
    /*if (this._websocket_service.getState() !=='connected')
    {
      this._websocket_service.connect()
    }*/
    this._websocket_service.systemMsg$.subscribe((v:any)=>Logger.log('[alcserver.service] websocket system message =',v));
    this._websocket_service._state$.subscribe((v)=>{
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



