(function($) {

// WebSocket object
var ws;

// The Div element selected by jQuery selector
var div = this;

function onWsMessage(message) {
   var json = JSON.parse(message.data);

   if (json.type === 'message') {
   	this.prepend('<p>' + json.data.message + '</p>');
   }
}

/*
 * var elm = $("#context")
 * elm.receiveWebSocket();
 */
$.fn.receiveWebSocket = function () {
  var self = this;
  ws.onmessage = onWsMessage.bind(this);
};

$.fn.sendMessage = function () {
	$(this).click(function() {
    	ws.send("[message]");
	});
};

/*
 *  var elm = $("#message");
 *  elm.createWebSocket();
 */
$.fn.createWebSocket = function () {
  var self = this;

  if ("WebSocket" in window)
  {
     // Let us open a web socket
     ws = new WebSocket("ws://192.168.1.102:8080/start", ['echo-protocol']);
     ws.onopen = function()
     {
	     self.append("<h2>Done</h2>");
     };

     ws.onclose = function()
     { 
        // websocket is closed.
     };
     ws.onerror = function()
     { 
        $(this).html("<h1>error</h1>");
     };
  }
  else
  {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }
};

})($);
