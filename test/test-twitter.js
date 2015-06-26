var test = require('tape')
var uuid = require('random-uuid-v4')
var request = require('request')
var TweetTweet = require('../')
var auth = require('./helpers/auth.js')

var tweet = TweetTweet(auth)

test('no cb', function (t) {
	var id = uuid()
	tweet(id)
	setTimeout(ensureTweetExists(t, id), 200) // Relatively consistent at 100ms
})

test('cb', function (t) {
	var id = uuid()
	tweet(id, ensureTweetExists(t, id))
})

test('status object without status property with callback', function (t) {
	t.plan(5)

	var first = true
	tweet({}, function (err, res) {
		t.notOk(first, 'second')
		first = false

		t.ok(err, 'error')
		t.notEqual(err.message.indexOf('status'), -1, 'has \'status\' in error message')
		t.notOk(res, 'no response')
		t.end()
	})

	t.ok(first, 'first')
	first = false
})

function ensureTweetExists(t, id) {
	t.plan(2)
	return function ete(err) {
		t.notOk(err, err ? err.message : 'no error')
		var exists = false

		request('https://twitter.com/tweettweet_test')
			.on('data', function (chunk) {
				if (chunk.toString().indexOf(id) !== -1) {
					exists = true
				}
			}).on('end', function () {
				t.ok(exists, 'found id (' + id.slice(0, 8) + ') in twitter feed')
				t.end()
			})
	}
}
