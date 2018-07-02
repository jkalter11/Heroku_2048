
curl -X GET "https://fbmessaging.herokuapp.com/webhook?hub.verify_token=testoken&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -H "Content-Type: application/json" -X POST "https://fbmessaging.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

