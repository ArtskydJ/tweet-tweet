var OAuth = require('oauth').OAuth

module.exports = function TweetTweet(auth) {
	if (typeof auth !== 'object') throw new Error('Expected auth to be an object')
	if (typeof auth.consumerKey !== 'string') throw new Error('expected auth.consumerKey to be a string')
	if (typeof auth.consumerSecret !== 'string') throw new Error('expected auth.consumerSecret to be a string')
	if (typeof auth.accessToken !== 'string') throw new Error('expected auth.accessToken to be a string')
	if (typeof auth.accessTokenSecret !== 'string') throw new Error('expected auth.accessTokenSecret to be a string')

	var REQ_URL = 'http://twitter.com/oauth/request_token'
	var ACC_URL = 'http://twitter.com/oauth/access_token'
	var oauth = new OAuth(REQ_URL, ACC_URL, auth.consumerKey, auth.consumerSecret, '1.0A', null, 'HMAC-SHA1')

	return function tweet(status, cb) {
		var params = (typeof status === 'object') ? status : { status: status }

		if (typeof params.status !== 'string') {
			var err = new Error('expected status to be a string')
			if (cb) {
				setTimeout(cb, 0, err)
			} else {
				throw err
			}
		} else {
			var UPDATE_URL = 'https://api.twitter.com/1.1/statuses/update.json'
			oauth.post(UPDATE_URL, auth.accessToken, auth.accessTokenSecret, params, function (err, data) {
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
}
