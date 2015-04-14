var test = require('tape')
var xtend = require('xtend')
var TweetTweet = require('../')

var auth = {
	consumerKey: 'lol',
	consumerSecret: 'lol',
	accessToken: 'lol',
	accessTokenSecret: 'lol'
}

test('constructor throwing', function (t) {
	t.plan(6)

	t.throws(function () {
		TweetTweet()
	}, 'constructor without auth object')

	t.throws(function () {
		var copy = xtend(auth)
		delete copy.consumerKey
		TweetTweet(copy)
	}, /consumerKey/, 'constructor without auth.consumerKey')

	t.throws(function () {
		var copy = xtend(auth)
		delete copy.consumerSecret
		TweetTweet(copy)
	}, /consumerSecret/, 'constructor without auth.consumerSecret')

	t.throws(function () {
		var copy = xtend(auth)
		delete copy.accessToken
		TweetTweet(copy)
	}, /accessToken/, 'constructor without auth.accessToken')

	t.throws(function () {
		var copy = xtend(auth)
		delete copy.accessTokenSecret
		TweetTweet(copy)
	}, /accessTokenSecret/, 'constructor without auth.accessTokenSecret')

	t.doesNotThrow(function () {
		TweetTweet(auth)
	}, 'constructor with everything')

	t.end()
})

test('constructed throwing', function (t) {
	t.plan(7)

	var tweet = TweetTweet(auth)

	t.throws(function () {
		tweet()
	}, /status/, 'tweet()')

	t.doesNotThrow(function () {
		tweet('lolz')
	}, 'tweet(str)')

	t.throws(function () {
		tweet({})
	}, /status/, 'tweet({})')

	t.doesNotThrow(function () {
		tweet({status: 'lolz'})
	}, 'tweet({status: str})')

	t.doesNotThrow(function () {
		tweet({}, function (err, data) {
			t.ok(err, err ? err.message : 'should have err')
			t.notOk(data, 'no data')
			t.end()
		})
	}, 'tweet({}, fn)')
})
