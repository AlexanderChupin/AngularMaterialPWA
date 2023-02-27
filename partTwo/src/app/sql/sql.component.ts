import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {HttpService} from "../services/http.service";
import {AlcMessage, AlcMessageType, AlcwebsocketService, LoggerService} from '../services/alcwebsocket.service';
import {scan, catchError, concatMap, map, takeUntil, tap,filter} from "rxjs/operators";
import {
  AlcRxjsToolsService,
  intAttempts_gateway,
  intRetries_gateway,
  msecDelay_gateway
} from "../services/alc-rxjs-tools.service";
import {BehaviorSubject, Observable, Observer, of, Subject} from "rxjs";
// import {InstanceIdService} from "../services/instance-id.service";
import {LoggerService as Logger} from '../services/logger.service'
import {LoaderService} from "../loader/loader.service";
import {AlcserverService} from "../services/alcserver.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpService]
})

export class SqlComponent implements OnInit, AfterViewInit {
  // ALC. Very useful article on how to unsubscribe from subscriptions [6 Ways to Unsubscribe from Observables in Angular \| by Chidume Nnamdi 🔥💻🎵🎮 \| Bits and Pieces](https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f)
  //ToDo add tslint rule for unsubscribe from all subsriptions
  private _notifierUnsubscribeAll: Subject<null> = new Subject(); //common notifier to unsubscribe from all subscriptions
  notifierGW: Subject<null> = new Subject(); // specific notifier to complete GW Observable.
  matTooltipGW:string = "Switch GW On"
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  sqlResponse = "";
  // [How to implement WebSockets in Angular Project \| indepth\.dev](https://indepth.dev/tutorials/angular/how-to-implement-websockets-in-angular-project)
  title = 'socketrv';
  content = '';
  received = [];
  sent = [];
  // private _wsClientId: number = null;
  public webSocketServiceId: number;
  gwText$: BehaviorSubject<string> = new BehaviorSubject('ALC. retry connection');
  // @Input() gwText$: string = 'ALC. retry connection';

  private static _spinnerTimeout: number = 700; //ALC. Spinner minimum timeout to make it visible to human
  constructor(
    public httpService: HttpService,
    private _websocket_service: AlcwebsocketService,
    private alcRxjsToolsService: AlcRxjsToolsService,
    private _loader: LoaderService,
    public _alcserver: AlcserverService,
  ) {
    // this.httpService.urlWol=gwEndpoint;
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log('ngOnChanges triggered', changes);
  }

  @Output()
  toggleChange: EventEmitter<void>

  transactions$: Observable<string> = this._websocket_service.messages$.pipe(
    /*map(rows =>
      rows['data']
    ),*/
    map(data =>
      JSON.stringify(data)
    ),
    tap({
      next: v => Logger.log('[sql.component] transactions$ next = ', v),
      error: error => Logger.warn('[sql.component] transactions$ error:', error),
      complete: () => Logger.log('[sql.component] transactions$ complete')
    }),
    catchError(error => { throw error }),
  );

  //ALC. accumulate received messaged. [How to append new line of text to a text area in Angular 2 \- Stack Overflow](https://stackoverflow.com/questions/56214301/how-to-append-new-line-of-text-to-a-text-area-in-angular-2)
  transactions_received$: Observable<string> = this.transactions$.pipe(
    map(v=>LoggerService.getLogDate()+v),
    scan((acc, v) => v + "\n" + acc),
  );

  ngOnInit(): void {
    let a = 1;
    //this._websocket_service.instanceIdService=1;
    this.webSocketServiceId = this._websocket_service.getInstanceId();
    // this.getRetriesRXJS();
    // this.turnGwOff ();
    // this.systemMsg$.subscribe(this.obsrSystem) ;
    Logger.log('[sql.component.ts] ngOnInit is called');
  }

  /**
   * ALC. Observer to get system messages
   */
  obsrSystem = {
    next: v=>{
      Logger.log('ALC system message', v)
    }
  }
  //ALC observer to react on GW requests
  obsrGW: Observer<any> = {
    next:(response:any) => {
      Logger.log(`ALC response`, response);
      if (response.response) {
        this.gwText$.next(this._loader.getMessage() +" " + response.response.toString())
        if (response.response.toString().match(/.+Success.+/)){
          // sabsGW.unsubscribe(); not required if below notifierGW used.
          this.notifierGW.next(null);
          this.turnGwOn();
        }
      }
      setTimeout(()=>this._loader.hide(),SqlComponent._spinnerTimeout) // ALC.hide loading spinner
    },
    error:
      (e) => {
        Logger.warn(`ALC. `, e);
        this.gwText$.next(this._loader.getMessage() + e);
        this.turnGwOff();
        setTimeout(()=>this._loader.hide(),SqlComponent._spinnerTimeout) // ALC.hide loading spinner
      },
    complete:
      () => {
        Logger.log(`retriesGW done`);
        this.gwText$.next(this._loader.getMessage() + " complete success");
        setTimeout(()=>this._loader.hide(),SqlComponent._spinnerTimeout) // ALC.hide loading spinner
      }
  }
  onTogleGwOn(e:Event){
    this.retriesGW.subscribe( this.obsrGW );
  };

  ngAfterViewInit() {
    //Logger.log('[sql.component.ts] ngAfterViewInit is called');
    let a = 1;
    this.onTogleGwOn(new Event('test'));
    // this.connect();
    /*if (this._websocket_service.getState() !=='connected'){
      this.connect();
    }*/
  }


  //transactions$ = this.service.messages$;
  sendMsg (form: NgForm){
    const post = {
      content: form.value.content
    };
    let msg : AlcMessage = {
      'type': AlcMessageType.client,
      'source': this._websocket_service.getWsClientId(),
      'body':{"message":post.content}
    }
    this._websocket_service.sendMessage(msg);
  }
  connect() {
    this._websocket_service.wsReset();
    this._websocket_service.connect();
  }

  reconnect() {
    this._websocket_service.connect({reconnect : true});
  }

  onConnect(e){
    this.connect();
  }

  onRecycle(e){
    this._websocket_service.onRecycle();
  }

  // ALC. [RxJS \- retry](https://rxjs.dev/api/operators/retry)
  retriesGW: Observable<any> = this.alcRxjsToolsService.getObsRetries(msecDelay_gateway,intAttempts_gateway,intRetries_gateway).
  pipe(
    takeUntil(this._notifierUnsubscribeAll),
    takeUntil(this.notifierGW),
    concatMap((v) => {
        let message = `ALC. attempt = ${v}`;
        Logger.log(message);
        this._loader.show(message);
        // this.arrRequests.push(this.httpService.getWol(v));
        return this.httpService.getWol(v).pipe(
          /*tap({
            error:(e)=>{
              return of({response: "ALC. ERROR caught in http service", error: e});
            }
          }),*/
          catchError(error => {
            // return this.handleError(error);
            //ToDo can not succeed rethowning errorr, somehow the whole observable complete if any arror thrown to component
            // console.log('error caught in http.service, rethrown further', error);
            return of({response: "ALC. ERROR caught in http service", error: error});
            // return EMPTY; // ALC. will only complete the inner observable but not forward the error responsethe
            // ALC. Don't use. If thrown to the inner observable, then complete all observables.
            // return throwError(error);    //Rethrow it back to component
          }));
      }
    )/*,
      switchAll(),
      catchError((err,caught)=>{
        return of({response: "ALC. ERROR caught in sql.component", err: err});
        //return EMPTY;
      })*/
  );

  turnGwOn () {
    this.checked = true;
    this.disabled = true;
    this.matTooltipGW = "ALC. you can not switch off GW, ignored"
  }

  turnGwOff () {
    this.checked = false;
    this.matTooltipGW = "Switch GW On"
  }

  ngOnDestroy() {
    this._notifierUnsubscribeAll.next(null);
    this._notifierUnsubscribeAll.complete();
    Logger.log('[sql.component] is destroyed')
  }
}


