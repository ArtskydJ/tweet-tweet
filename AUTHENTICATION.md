authenticating `tweet-tweet`
----------------------------

A few steps are required to set up a Twitter account with OAuth.

Here are the steps to allow `tweet-tweet` to post on your Twitter account:

#### 1. Create an Application (This lets Twitter know what is accessing your account.)

- Go to https://apps.twitter.com/app/new
- Fill out the form
- Click `Yes, I agree`, then click `Create your Twitter application`

#### 2. Generate an Access Token

- Click the `Keys and Access Tokens` tab
- Toward the bottom, click `Create my access token`

#### 3. Copy the Credentials

- Copy the 'Consumer Key', 'Consumer Secret', 'Access Token', and 'Access Token Secret'

```js
var TweetTweet = require('tweet-tweet')
var tweet = TweetTweet({
	consumerKey: "abc12",
	consumerSecret: "def345",
	accessToken: "ghi67",
	accessTokenSecret: "jkl890"
})

tweet('That was easy!')
```
