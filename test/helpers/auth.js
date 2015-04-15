var auth = null
try {
	auth = require('./config.json')
} catch (e) {
	auth = JSON.parse(process.env.TWITTER_AUTH)
}
module.exports = auth
