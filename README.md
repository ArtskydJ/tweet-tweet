tweet-tweet
=========

[![Build Status](https://travis-ci.org/ArtskydJ/tweet-tweet.svg)](https://travis-ci.org/ArtskydJ/tweet-tweet)
[![Dependency Status](https://david-dm.org/artskydj/tweet-tweet.svg)](https://david-dm.org/artskydj/tweet-tweet)
[![devDependency Status](https://david-dm.org/artskydj/tweet-tweet/dev-status.svg)](https://david-dm.org/artskydj/tweet-tweet#info=devDependencies)

A no-nonsense api for posting tweets.

This is *only* for updating your Twitter status. This does not get tweets, or stream search results.

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

tweet('Never teach someone how to cartwheel beside a lake. #lessonlearned')

setTimeout(function () {
	tweet('That awkward moment when you wake up... Said no one ever.')
}, 60 * 1000)
```

# api

```js
var TweetTweet = require('tweet-tweet')
```

## `TweetTweet(auth)`

If you don't know how to get the tokens and secrets from Twitter, see [AUTHENTICATION.md](https://github.com/ArtskydJ/tweet-tweet/blob/master/AUTHENTICATION.md) for detailed instructions.

- `auth` is an object with the following properties, all of which are required:
	- `consumerKey`
	- `consumerSecret`
	- `accessToken`
	- `accessTokenSecret`
- Returns `tweet` function.

## `tweet(status, [cb])`

- `status` is a string or an object
	- If it is a string, it is the text of your status update.
	- If it is an object, it can have the parameters specified in the [Twitter API][twitter-update-status-api] under the *Parameters* section.
		- `status` - **Required.** The text of your status update. E.g. `'i love my cat. #cats'`
		- `in_reply_to_status_id` - The ID of an existing status that the update is in reply to. Note that the author must be referenced in the `status`. E.g. `'@twitter'`
		- `possibly_sensitive` - If the tweet contains nudity, violence, etc. set this to `true`. Defaults to `false`.
- `cb(err, response)` is an optional callback function. If no callback is given, errors will be thrown.
	- `err` is an Error object or null.
	- `response` is the parsed JSON response. See a sample response in the [Twitter API][twitter-update-status-api] under the *Example Result* section.

```js
// Status string vs. status object
tweet('i like Twitter')
// Equivalent
tweet({ status: 'i like Twitter' })


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
