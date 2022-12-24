import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {HttpService} from "../services/http.service";
import { AlcwebsocketService } from '../services/alcwebsocket.service';
import {map, catchError, tap} from "rxjs/operators";
// import {InstanceIdService} from "../services/instance-id.service";

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpService]
})
export class SqlComponent implements OnInit, AfterViewInit {
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
  constructor(
    public http: HttpService,
    private websocket_service: AlcwebsocketService
  ) {
  }
  @Output()
  toggleChange: EventEmitter<void>
  ngOnInit(): void {
    let a = 1;
    //this.websocket_service.instanceIdService=1;
    this.webSocketServiceId = this.websocket_service.getInstanceId();
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
      error: error => console.log('[Live Table component] Error:', error),
      complete: () => console.log('[Live Table component] Connection Closed')
    })
  );

  onTogleChange(e:Event){
    this.http.getWol().subscribe(response => {
      this.sqlResponse = response.response;
    });
  };

  ngAfterViewInit() {
    let a = 2;
    this.connect();
/*    this.websocket_service.messages$.subscribe({
        next: (data) => {
          console.log("ALC. Data = " + data);
          this.received.push(data);
        },
        error: (error) => {
          console.log("ALC. Error = " + error);
        },
        complete: () => {
          console.log("ALC. completed");
        }
      }
    )*/
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
}
