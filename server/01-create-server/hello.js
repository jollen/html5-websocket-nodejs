var http = require('http');

var httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello World</h1>\n');
});

httpServer.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');