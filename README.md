# Twitter executor for [Runnerty]:

### Methods:
* Configuration sample:
```json
{
  "id": "twitter_default",
  "type": "@runnerty-executor-twitter",
  "consumerKey":"123abc",
  "consumerSecret":"123abc" ,
  "accessToken":"123abc",
  "accessTokenSecret":"123abc"
}
```

* Plan sample to update our twitter status:
```json
{
  "id":"twitter_default",
  "command":"update",
  "status": "Hello I'm #runnerty #twitter #bot"
}
```

* Plan sample to search a hashtag:
```json
{
  "id":"twitter_default",
  "command":"search",
  "query": "#runnerty"
}
```

* Plan sample to get an user's followers:
```json
{
  "id":"twitter_default",
  "command":"followers",
  "screen_name": "@runnerty"
}
```

* Plan sample to get an user's followers:
```json
{
  "id":"twitter_default",
  "command":"retweet",
  "tweet_id": "12345678"
}
```

* Plan sample to send a direct message:
```json
{
  "id":"twitter_default",
  "command":"direct",
  "screen_name": "runnerty_io",
  "textToSend": "Hello Runnerty"
}
```

[Runnerty]: http://www.runnerty.io