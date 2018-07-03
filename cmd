
curl -X GET "https://fbmessaging.herokuapp.com/webhook?hub.verify_token=testoken&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -H "Content-Type: application/json" -X POST "https://fbmessaging.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

curl "https://graph.facebook.com/v2.6/me/messages?access_token=EAADJ5l7nbhoBAPYHDiX1iOqHhJKipgJGZAoEiTc8Jk8F0nZC9pSAP4t9QNdeqDy7T6dkSuyVADZB0VvsYXH09FtbhZAEpmFdUQkTMyIsr3FDeU1JkZAqZBRSKRWZAEAHUedXwTC9SHj82NYirmhWLbsw0dtWgDIh9MEsweaACAAuH2zZA30XiSrh" 
   -X POST 
   -H "Content-Type: application/json" 
   -d '{
  "messaging_type": "UPDATE",
  "recipient": {
    "id": "1674107716041431"
  },
  "message": {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "It has been a while since your last game. Time to get back",
            "buttons": [
              {
                "type": "game_play",
                "title": "Play Tic-Tac-Toe.",
                "payload": "{}",
                "game_metadata": {
                  "context_id": "2256048617755201"
                }
              }
            ]
          }
        ]
      }
    }
  }
}'
