var REQUEST_URL = 'http://twitter.com/oauth/request_token'
var ACCESS_URL = 'http://twitter.com/oauth/access_token'
var STATUS_UPDATE_URL = 'https://api.twitter.com/1.1/statuses/update.json'

var OAuth = require('oauth').OAuth

module.exports = function TweetTweet(auth) {
	if (typeof auth !== 'object') throw new Error('Expected auth to be an object')
	if (typeof auth.consumerKey !== 'string') throw new Error('Expected auth.consumerKey to be a string')
	if (typeof auth.consumerSecret !== 'string') throw new Error('Expected auth.consumerSecret to be a string')
	if (typeof auth.accessToken !== 'string') throw new Error('Expected auth.accessToken to be a string')
	if (typeof auth.accessTokenSecret !== 'string') throw new Error('Expected auth.accessTokenSecret to be a string')

	var oauth = new OAuth(REQUEST_URL, ACCESS_URL, auth.consumerKey, auth.consumerSecret, '1.0A', null, 'HMAC-SHA1')

	return function tweet(status, cb) {
		var params = (typeof status === 'object') ? status : { status: status }

		if (typeof params.status !== 'string') {
			var err = new Error('Expected status to be a string')
			cb ? setTimeout(cb, 0, err) : throw err
		} else {
			if (!cb) cb = function thrw(err) { throw err }
			oauth.post(STATUS_UPDATE_URL, auth.accessToken, auth.accessTokenSecret, params, function (err, data) {
				if (err) {
					cb(err)
				} else {
					try {
						var parsed = JSON.parse(data)
					} catch(e) {
						err = e
					}
					cb(err, parsed)
				}
			})
		}
	}
}
