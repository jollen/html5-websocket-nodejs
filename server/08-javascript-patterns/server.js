var http = require("http");
var url = require("url");
var WebSocketServer = require('websocket').server;
// Connected WebSocket clients
var clients = [];

// Export functions (IIFE)
exports = module.exports = (function() {
  return new Server();
})();

/**
 * Class
 */
function Server() {

};

Server.prototype.start = function(route, handlers) {
  var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;

    console.log("Request for " + pathname + " received.");

    route(pathname, handlers, response, query, clients);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(8080, function() {
     console.log("Server has started and is listening on port 8080.");
  });

  var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  var onWsConnMessage = function(message) {
    if (message.type == 'utf8') {
      // Data push to all clients
      for (var i = 0; i < clients.length; i++) {
          clients[i].sendUTF(message.utf8Data);
      }
    } else if (message.type == 'binary') {
      console.log('Received binary data.');
    }
  };

  var onWsConnClose = function(reasonCode, description) {
    console.log('Peer disconnected with reason: ' + reasonCode);
  };

  var onWsRequest = function(request) {
    var connection = request.accept('', request.origin);
    console.log("WebSocket connection accepted.");

    // Save clients (unlimited clients)
    clients.push(connection);

    connection.on('message', onWsConnMessage);
    connection.on('close', onWsConnClose);
  };

  wsServer.on('request', onWsRequest);
};
