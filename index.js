var OAuth = require('oauth').OAuth

module.exports = function TweetTweet(auth) {
	if (typeof auth !== 'object') {
		throw new Error('Expected auth to be an object')
	}
	var requiredKeys = [ 'consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret' ]
	requiredKeys.forEach(function (key) {
		if (typeof auth[key] !== 'string') {
			throw new Error('expected auth.' + key + ' to be a string')
		}
	})

	var REQ_URL = 'http://twitter.com/oauth/request_token'
	var ACC_URL = 'http://twitter.com/oauth/access_token'
	var oauth = new OAuth(REQ_URL, ACC_URL, auth.consumerKey, auth.consumerSecret, '1.0A', null, 'HMAC-SHA1')

	return function tweet(status, cb) {
		var params = (typeof status === 'object') ? status : { status: status.toString() }

		var UPDATE_URL = 'https://api.twitter.com/1.1/statuses/update.json'
		oauth.post(UPDATE_URL, auth.accessToken, auth.accessTokenSecret, parameters, function (err, data) {
			var parsed
			try {
				parsed = JSON.parse(data)
			} catch(e) {
				err = err || e
			}
			cb && cb(err, parsed)
		})
	}
}
