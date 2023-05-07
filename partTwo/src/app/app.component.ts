import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  OnInit, ChangeDetectionStrategy
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IosInstallComponent } from "./ios-install/ios-install.component";
import { AuthService } from "./auth/auth.service";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import { AlcwebsocketService } from './services/alcwebsocket.service';
import { LoggerService as Logger } from './services/logger.service';
import {AlcserverService,alcServerState} from "./services/alcserver.service";
import {timer} from "rxjs";
import {SwPush} from '@angular/service-worker';
import { environment } from '../environments/environment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = "Material PWA";
  mobileQuery: MediaQueryList;
  nav = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "My Account (Part 2)",
      path: "/auth/signin"
    },
    {
      title: "Manage SQL",
      path: "/manage/sql"
    },
    {
      title: "Manage SQL1",
      path: "/manage/sql1"
    },
    {
      title: "Manage SQL-multi",
      path: "/manage/sql-multi"
    },
    {
      title: "Page 404",
      path: "/manage/404404"
    }
  ];
  avatar: string;
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: AuthService,
    private toast: MatSnackBar,
    public _alcserverService: AlcserverService,
    readonly swPush: SwPush
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    auth.authState.subscribe((event: string) => {
      if (event === AuthService.SIGN_IN) this.checkSession();
      if (event === AuthService.SIGN_OUT) this.avatar = undefined;
    });
  }

  ngOnInit() {
    this.detectIOS();
    this.checkSession();
    this._alcserverService.stateForIcon.subscribe(v=>Logger.log('[app.comonent] stateForIcon =',v))
    //timer(4000).subscribe(()=>this._alcserverService.setServerState(alcServerState.Up))
  }

  public subscribeToPush() {
      const PUBLIC_VAPID_KEY_OF_SERVER = environment.VAPID.publicKey;
      const sub = this.swPush.requestSubscription({
        serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER,
      }).
      then(data => {
        console.info('[ALC app.component] subscribeToPush subscribed result=', data.toJSON());
      }).
      catch(err =>
        console.error("[ALC app.component] subscribeToPush Could not subscribe to notifications", err)
      );
  }

  public subscribeToNotificationClicks() {
    if (this.swPush.isEnabled) {
      console.info('[ALC app.component] notificationClicks going to subscribe')
      this.swPush.notificationClicks.subscribe(
        ({action, notification}) => {
          // TODO: Do something in response to notification click.
          console.info('[ALC app.component] notificationClicks action received =', action)
          alert('ALC. '+action);
        });
      console.info('[ALC app.component] this.swPush.notificationClicks=',this.swPush.notificationClicks);
    }
  }
  ngAfterViewInit(){
      }

  async checkSession() {
    try {
      const userInfo = await Auth.currentUserInfo();
      if (userInfo && userInfo.attributes.profile) {
        const avatar = userInfo.attributes.profile;
        const url = (await Storage.vault.get(avatar)) as string;
        this.avatar = url;
      }
    } catch (error) {
      console.log("no session: ", error);
    }
  }

  detectIOS() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in (window as any).navigator &&
      (window as any).navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setTimeout(() => {
        this.toast.openFromComponent(IosInstallComponent, {
          duration: 8000,
          horizontalPosition: "start",
          panelClass: ["mat-elevation-z3"]
        });
      });
    }
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  /*btnClick = ()=> {
    this.router.navigateByUrl('/user');
  }*/
}
