const WebSocket = require('ws');
// 'wss://stream.binance.com:9443/ws/btcusdt@depth';
const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
//const ws = new WebSocket('wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self');

ws.on('open', function open() {
  console.log('connected');
});

/*
{
    e: '24hrTicker',
    E: 1647658205289,
    s: 'XRPETH',
    p: '-0.00001350',
    P: '-4.767',
    w: '0.00027469',
    x: '0.00028370',
    c: '0.00026970',
    Q: '2450.00000000',
    b: '0.00026930',
    B: '7128.00000000',
    a: '0.00026950',
    A: '2515.00000000',
    o: '0.00028320',
    h: '0.00028500',
    l: '0.00026740',
    v: '2964849.00000000',
    q: '814.41590960',
    O: 1647571805093,
    C: 1647658205093,
    F: 25537275,
    L: 25542929,
    n: 5655
  },

 */

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data) {
  console.log('==============================');

  console.log('data', JSON.parse(data.toString()));

  console.log('==============================');
});

ws.on('error', function(error) {
  console.log('error', error);
});