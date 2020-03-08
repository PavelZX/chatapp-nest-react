const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', function connection(ws) {
  console.log('client connected');
  ws.on('message', function incoming(data) {
    console.log('on message');
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });
});
