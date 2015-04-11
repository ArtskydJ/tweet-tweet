authenticating `tweet-tweet`
----------------------------

A few steps are required to set up a twitter account with OAuth.

Here are the steps to allow `tweet-tweet` to post on your twitter account:

- Create an Application (This lets twitter know what is accessing your account.)
	- Go to https://apps.twitter.com/app/new
	- Fill out the form
	- Click 'Yes, I agree'
	- Click 'Create your Twitter application'
- Generate Access Token
	- Click the 'Keys and Access Tokens' tab
	- Toward the bottom, click 'Create my access token'
- Input relevant data
	- Copy the 'Consumer Key', 'Consumer Secret', 'Access Token', and 'Access Token Secret'...
	- ...to a json file
	- ...or to a javascript object

```json
{
	"consumerKey": "abc12",
	"consumerSecret": "def345",
	"accessToken": "ghi67",
	"accessTokenSecret": "jkl890"
}
```

```js
var TweetTweet = require('tweet-tweet')
var twitterConfig = require('./twitter-config.json')

var tweet = TweetTweet(twitterConfig)
tweet('that was easy')
```

Or if you want to be hated by everyone who comes across your code:

```js
require('tweet-tweet')
(require('./twitter-config.json'))
('i write bad code')
```
