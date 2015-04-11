tweet-tweet
=========

A no-nonsense api for posting tweets.

This is *only* for updating your twitter status. This does not get tweets, or stream search results.

Images and videos are not supported.

# example

```js
var TweetTweet = require('tweet-tweet')

var tweet = TweetTweet({
	consumerKey: '...',
	consumerSecret: '...',
	accessToken: '...',
	accessTokenSecret: '...'
})

tweet('That awkward moment when you wake up... Said no one ever.')

setTimeout(function () {
	tweet('Never teach someone how to cartwheel beside a lake. #fail #lessonlearned')
}, 60 * 1000)
```

# api

```js
var TweetTweet = require('tweet-tweet')
```

## `TweetTweet(auth)`

If you don't know how to get the tokens and secrets from twitter, see [AUTHENTICATION.md](https://github.com/ArtskydJ/tweet-tweet/blob/master/AUTHENTICATION.md) for detailed instructions.

- `auth` is an object with the following properties, all of which are required:
	- `consumerKey`
	- `consumerSecret`
	- `accessToken`
	- `accessTokenSecret`
- Returns `tweet()`.

## `tweet(status, [cb])`

- `status` is a string or an object
	- If it is a string, it is the text of your status update.
	- If it is an object, it can have the parameters specified [here][twitter-update-status-api].
		- `status` - **Required.** The text of your status update. E.g. `'i love my cat. #cats'`
		- `in_reply_to_status_id` - The ID of an existing status that the update is in reply to. Note that the author must be referenced in the `status`. E.g. `'@twitter'`
		- `possibly_sensitive` - If the tweet contains nudity, violence, etc. you should set this to `true`. Defaults to `false`.
		- For more parameters/information, see the [Twitter Update Status API][twitter-update-status-api].
- `cb(err, response)` is an optional callback function. `response` is the parsed JSON response.

```js
// Status string vs. status object
tweet('i like twitter')
// Equivalent
tweet({ status: 'i like twitter' })


// Setting parameters
tweet({
	status: 'not for weak stomachs: http://emergency-room-pictures.com',
	possibly_sensitive: true
})

tweet({
	status: 'Happy birthday @twitter!',
	in_reply_to_status_id: '579328173764014080'
})

tweet('why is the sky blue?', function (err, res) {
	if (err) throw err
	else console.log(res)
})

tweet({
	status: 'People comment "lol" even when they do not laugh.'
}, function (err, res) {
	if (err) throw err
	else console.log(res)
})
```

# install

With [npm](http://nodejs.org/download) do:

	npm install tweet-tweet

# license

[VOL](http://veryopenlicense.com)



[twitter-update-status-api]: https://dev.twitter.com/rest/reference/post/statuses/update
