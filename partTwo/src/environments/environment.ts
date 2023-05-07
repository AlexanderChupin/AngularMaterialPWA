// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  confirm: {
    email: '',
    password: ''
  },
  // [ng\-realtime\-dashboard/environment\.ts at master · lamisChebbi/ng\-realtime\-dashboard](https://github.com/lamisChebbi/ng-realtime-dashboard/blob/master/src/environments/environment.ts)
  wsEndpoint: 'wss://alexcloud.myqnapcloud.com:8888/ws',
  // wsEndpoint:'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  // ALC. reconnect interval to connect to the gateway (alexnas)
  reconnectInterval: 2000,
  // ALC. retries to connect to the gateway (alexnas)
  gwEndpoint: 'https://alexcloud.myqnapcloud.com:8081/alcwol.php',
  msecDelay_gateway: 2000,
  intAttempts_gateway: 3,
  intRetries_gateway: 2,
  msecDelay_websocket: 1000, //ALC. base delay between websocket connection requests
  intAttempts_websocket: 3, //ALC. number of attempts for websocket reconnect
  intRetries_websocket: 2, //ALC. number of retry series for for websocket reconnect before going to ping-pong timeout
  ping_pong_websocket_timeout: 30000, //ALC. msec, ping-pong websocket requests
  //ALC. https://stackblitz.com/edit/angular-logger-service
  LOG_LEVEL: 'DEBUG',
  VAPID: {"publicKey":"BNuwFb3APzhdATR65rkgwmONMHEwKbZeQgY-eJuj3tNBM-_H4ttCn3TgjLvYEY3QYvS2sMWkCWQZpBqOGm4m7vI","privateKey":"SP2GjghFsSOYHknULxFka4LrKPfSOG-l_GxqJdOYijk"}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
