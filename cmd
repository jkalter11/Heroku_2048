"messaging_type": "RESPONSE"

curl -X POST -H "Content-Type: application/json" -d '{
  "messaging_type": "RESPONSE",
  "recipient": {
    "id": "1403651696402679"
  },
  "message": {
    "text": "hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=EAADJ5l7nbhoBAPYHDiX1iOqHhJKipgJGZAoEiTc8Jk8F0nZC9pSAP4t9QNdeqDy7T6dkSuyVADZB0VvsYXH09FtbhZAEpmFdUQkTMyIsr3FDeU1JkZAqZBRSKRWZAEAHUedXwTC9SHj82NYirmhWLbsw0dtWgDIh9MEsweaACAAuH2zZA30XiSrh"
