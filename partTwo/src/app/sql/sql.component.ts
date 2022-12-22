import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {HttpService} from "../services/http.service";
import { AlcwebsocketService } from 'src/app/services/alcwebsocket.service';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
  constructor(public http: HttpService, private service: AlcwebsocketService) { }
  @Output()
  toggleChange: EventEmitter<void>
  ngOnInit(): void {
  }

  onTogleChange(e:Event){
    this.http.getWol().subscribe(response => {
      this.sqlResponse = response.response;
    });
  };

  ngAfterViewInit() {
    this.service.connect();
  }
  //transactions$ = this.service.messages$;
  sendMsg (){
    this.service.sendMessage(this.content);
  }
  connect() {
    this.service.connect();
  }

  close() {
    this.service.close();
  }

  reconnect() {
    this.service.connect({reconnect : true});
  }
}
