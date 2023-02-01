export const environment = {
  production: true,
  confirm: {
    email: "",
    password: ""
  },
  // [ng\-realtime\-dashboard/environment\.ts at master · lamisChebbi/ng\-realtime\-dashboard](https://github.com/lamisChebbi/ng-realtime-dashboard/blob/master/src/environments/environment.ts)
  wsEndpoint: 'wss://alexcloud.myqnapcloud.com:8888/ws',
  // wsEndpoint:'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  reconnectInterval: 2000,

  // ALC. retries to connect to the gateway (alexnas)
  gwEndpoint: 'https://alexcloud.myqnapcloud.com:8081/alcwol.php',
  msecDelay_gateway: 5000,
  intAttempts_gateway: 3,
  intRetries_gateway: 2,
  msecDelay_websocket: 1000, //ALC. base delay between websocket connection requests
  intAttempts_websocket: 3, //ALC. number of attempts for websocket reconnect
  intRetries_websocket: 2, //ALC. number of retry series for for websocket reconnect before going to ping-pong timeout
  ping_pong_websocket_timeout: 120000, //ALC. msec, ping-pong websocket requests
  //ALC. https://stackblitz.com/edit/angular-logger-service
  LOG_LEVEL: 'INFO'
};
