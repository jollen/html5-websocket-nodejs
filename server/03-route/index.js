var server = require("./server");
var router = require("./router");

server.start(router.route);		// 傳遞route物件