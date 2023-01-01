import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, SimpleChanges/*, ChangeDetectorRef*/
} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {HttpService, gwEndpoint} from "../services/http.service";
import { AlcwebsocketService } from '../services/alcwebsocket.service';
import {
  map,
  catchError,
  tap,
  switchAll,
  concatMap,
  concatAll,
  switchMap,
  mergeAll,
  takeUntil,
  startWith, filter
} from "rxjs/operators";
import {AlcRxjsToolsService, intAttempts_gateway, intRetries_gateway, msecDelay_gateway} from "../services/alc-rxjs-tools.service";
import {
  BehaviorSubject,
  EMPTY,
  from,
  mergeMap,
  Observable,
  Observer,
  of,
  retry,
  Subject,
  Subscription,
  throwError
} from "rxjs";
// import {InstanceIdService} from "../services/instance-id.service";
import {LoggerService as Logger} from '../services/logger.service'
import {pipeline} from "stream";
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
  notifier: Subject<null> = new Subject(); //common notifier to unsubscribe from all subscriptions
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
  public webSocketServiceId: number;
  arrRequests: Array<Observable<any>> = [];
  gwText$: BehaviorSubject<string> = new BehaviorSubject('ALC. retry connection');
  // @Input() gwText$: string = 'ALC. retry connection';
  constructor(
    public httpService: HttpService,
    private websocket_service: AlcwebsocketService,
    private alcRxjsToolsService: AlcRxjsToolsService
  ) {
    // this.httpService.urlWol=gwEndpoint;
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log('ngOnChanges triggered', changes);
  }

  @Output()
  toggleChange: EventEmitter<void>
  ngOnInit(): void {
    let a = 1;
    //this.websocket_service.instanceIdService=1;
    this.webSocketServiceId = this.websocket_service.getInstanceId();
    // this.getRetriesRXJS();
    // this.turnGwOff ();
  }
  transactions$ = this.websocket_service.messages$.pipe(
    /*map(rows =>
      rows['data']
    ),*/
    map(data =>
      JSON.stringify(data)
    ),
    catchError(error => { throw error }),
    tap({
      error: error => Logger.warn('[Live Table component] Error:', error),
      complete: () => Logger.log('[Live Table component] Connection Closed')
    })
  );
  //ALC observer to react on GW requests
  obsrGW: Observer<any> = {
    next:(response:any) => {
      Logger.log(`ALC response`, response);
      if (response.response) {
        this.gwText$.next(response.response.toString())
        if (response.response.toString().match(/.+Success.+/)){
          // sabsGW.unsubscribe(); not required if below notifierGW used.
          this.notifierGW.next(null);
          this.turnGwOn();
        }
      }
    },
    error:
      (e) => {
        Logger.warn(`ALC. error`, e)
      },
    complete:
      () => {
        Logger.log(`getRetriesRXJS done`);
      }
  }
  onTogleGwOn(e:Event){
    this.retriesGW.subscribe( this.obsrGW );
  };

  ngAfterViewInit() {
    let a = 1;
    this.onTogleGwOn(new Event('test'));
    this.connect();
  }


  //transactions$ = this.service.messages$;
  sendMsg (){
    this.websocket_service.sendMessage(this.content);
  }
  connect() {
    this.websocket_service.connect();
  }

  close() {
    this.websocket_service.close();
  }

  reconnect() {
    this.websocket_service.connect({reconnect : true});
  }

  // ALC. [RxJS \- retry](https://rxjs.dev/api/operators/retry)
  retriesGW: Observable<any> = this.alcRxjsToolsService.getObsRetries(msecDelay_gateway,intAttempts_gateway,intRetries_gateway).
  pipe(
    takeUntil(this.notifier),
    takeUntil(this.notifierGW),
    concatMap((v) => {
        Logger.log(`ALC. attempt = ${v}`);
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


  GWCheckedOp<T>(source: Observable<any>) {
    return source.pipe(
      filter(v => v && v.response && v.response.toString().match(/.+Success.+/))
      ,map(v=>v?true:false)
      ,tap(v=>{
        let a =1;
      })
    );
  }
  obslChecked: Observable<any>;

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
    this.notifier.next(null);
    this.notifier.complete();
  }
}
