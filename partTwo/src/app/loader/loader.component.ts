import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

let i = 0;
@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  message = "Please wait...";
  count: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public ref: ChangeDetectorRef,
              public _ngZone: NgZone) {
    if (data.message) this.message = data.message;
  }

  ngOnInit() {
    this.count = i++;
    console.log('ALC. LoaderComponent ngOnInit called '+ this.count)
  }
}
