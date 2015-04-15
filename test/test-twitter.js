var test = require('tape')
var uuid = require('random-uuid-v4')
var request = require('request')
var TweetTweet = require('../')

var auth = null
try {
	auth = require('./config.json')
} catch (e) {
	auth = e
}

if (auth instanceof Error) {
	test('missing authentication configuration', function (t) {
		t.equal(auth.message, 'Cannot find module \'./config.json\'', auth.message)
		t.end()
	})
} else {
	var tweet = TweetTweet(auth)

	test('posts to twitter', function (t) {
		var id = uuid()
		tweet(id)
		setTimeout(ensureTweetExists(t, id), 200) // Relatively consistent at 100ms
	})

	test('callback gets called', function (t) {
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
}

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
				t.ok(exists, 'found id in twitter feed')
				t.end()
			})
	}
}
