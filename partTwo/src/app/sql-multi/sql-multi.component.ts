import { Component, OnInit } from '@angular/core';
import {SqlComponent} from "../sql/sql.component";
import {AlcwebsocketService} from "../services/alcwebsocket.service";

@Component({
  selector: 'app-sql-multi',
  templateUrl: './sql-multi.component.html',
  styleUrls: ['./sql-multi.component.scss']
})
export class SqlMultiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
