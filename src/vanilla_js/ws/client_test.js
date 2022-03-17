const WebSocket = require('ws');
// 'wss://stream.binance.com:9443/ws/btcusdt@depth';
const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@aggTrade/btcusdt@depth');

ws.on('open', function open() {
  console.log('connected');
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data) {
  console.log('data', data, data.toString());
});

ws.on('error', function(error) {
  console.log('error', error);
});