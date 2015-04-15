try {
	module.exports = require('./config.json')
} catch (e) {
	module.exports = {
		consumerKey: process.env.TWITTER_CK,
		consumerSecret: process.env.TWITTER_CS,
		accessToken: process.env.TWITTER_AT,
		accessTokenSecret: process.env.TWITTER_ATS,
	}
}
