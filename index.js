'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
		// Gets the message. entry.messaging is an array, but 
		// will only ever contain one message, so we get index 0
		let webhook_event = entry.messaging[0];
		console.log(webhook_event);
     	if (webhook_event.game_play) {
		  var senderId = webhook_event.sender.id; // Messenger sender id
		  var playerId = webhook_event.game_play.player_id; // Instant Games player id
		  var contextId = webhook_event.game_play.context_id; 
		  //var payload = webhook_event.game_play.payload;
		  //var playerWon = payload['playerWon'];
		  if (true) { //playerWon
		    callSendAPI(
		      playerId, 
		      'Congratulations on your victory!', 
		    );

		  } else {
		    sendMessage(
		      senderId, 
		      contextId, 
		      'Better luck next time!', 
		      'Rematch!'
		    );
		  }
		}
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": "EAADJ5l7nbhoBAKZBUJ3CnoHzE85E9ZA8oN5ZAUmioOea9GsXjc6QMthsGlKovQGzMMy4U24ywZB3RtsWwLCcMy3TBeU3Bvg07yFy8Y26ab5Swz9qta5288nunQ6duOd5ZAEU6DX5zY4FahZA3ex8L3w8klOHzXn5nFbqI0GsUBvaZBy9F3hg4ea"},
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

 	// Your verify token. Should be a random string.
  	let VERIFY_TOKEN = "testoken"
    
  	// Parse the query params
  	let mode = req.query['hub.mode'];
  	let token = req.query['hub.verify_token'];
  	let challenge = req.query['hub.challenge'];
    
  	// Checks if a token and mode is in the query string of the request
 	if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
