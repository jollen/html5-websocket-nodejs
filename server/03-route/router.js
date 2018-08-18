//var wot = require('wotcity.io');

function send() {
	console.log('/send ...');
}

function start() {
	console.log('/start ...');
}

// associative array
var handlers = {
	'/send': send,
	'/start': start
};

function route(pathname) {
    console.log("Route this request: " + pathname);

    if (typeof handlers[pathname] === 'function')
    	return handlers[pathname]();

    console.log('API undefined');
}

exports.route = route;