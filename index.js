'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  request = require('request'),
  token = "EAADJ5l7nbhoBAPYHDiX1iOqHhJKipgJGZAoEiTc8Jk8F0nZC9pSAP4t9QNdeqDy7T6dkSuyVADZB0VvsYXH09FtbhZAEpmFdUQkTMyIsr3FDeU1JkZAqZBRSKRWZAEAHUedXwTC9SHj82NYirmhWLbsw0dtWgDIh9MEsweaACAAuH2zZA30XiSrh",
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
		console.log(entry.messaging);
    if (webhook_event.game_play) {
		  var senderId = webhook_event.sender.id; // Messenger sender id
		  var playerId = webhook_event.game_play.player_id; // Instant Games player id
		  var contextId = webhook_event.game_play.context_id; 
		  var payload = JSON.parse(webhook_event.game_play.payload);
		  //var playerWon = payload['playerWon'];
		  if (true) { //playerWon
		    SendGameMessage(
		      senderId, 
          contextId,
		      'Congratulations on your victory!', 
          payload
		    );
		    console.log("game received");

		  } else {
		    sendMessage(
		      senderId, 
		      contextId, 
		      'Better luck next time!', 
		      'Rematch!'
		    );
		  }
		}
		else if (webhook_event.message){
			var senderId = webhook_event.sender.id;
			console.log(senderId);
			callSendAPI(
		      senderId, 
		      'Congratulations on your victory!', 
		    );
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
  	"messaging_type": "RESPONSE",
    "recipient": {
      "id": sender_psid
    },
   //  "message": {
   //    "text": "Congratulations!"
  	// }
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": response,
              "buttons": [
                {
                  "type": "web_url",
                  "url": "https://developers.facebook.com/docs/messenger-platform/send-messages/buttons",
                  "title": "YES",
                }
              ]
            }
          ]
        }
      }
    }
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages?access_token="+token,
    method: "POST",
    json: true,
    body:request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

function SendGameMessage(sender_psid, context_id, response, payload) {
  var button = {
    type: "game_play",
    title: "GAME",
    game_metadata: {
      context_id: context_id
    }
  };
  // if (payload) {
  //     button.payload = JSON.stringify(payload)
  // }
  var messageData = {
      recipient: {
          id: "1403651696402679" //sender_psid
      },
      message: {
          attachment: {
              type: "template",
              payload: {
                  template_type: "generic",
                  elements: [
                  {
                      title: response,
                      buttons: [button]
                  }
                  ]
              }
          }
      }
  };

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages?access_token="+token,
    method: "POST",
    json: true,
    body: messageData
  }, (err, res, body) => {
    if (!err) {
      console.log('text message sent!')
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

