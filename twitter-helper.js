/* Copyright IBM Corp. 2015
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var util = require('util');
var Twitter = require('twitter');

var MAX_COUNT = 200;

/**
 * Transform Tweets to ContentItems to be used
 * @param  {Twitter tweet} A tweet from the Twitter API
 */
function toContentItem(tweet) {
  return {
    id: tweet.id_str,
    userid: tweet.user.id_str,
    sourceid: 'twitter',
    language: (tweet.lang && (['es', 'en'].indexOf(tweet.lang) > -1)) ? tweet.lang : 'en',
    contenttype: 'text/plain',
    content: tweet.text.replace('[^(\\x20-\\x7F)]*', ''),
    created: Date.parse(tweet.created_at)
  };
}

/**
 * Transform a twitter user to our app user
 * @param  {Twitter User} twitter representation of a user
 * @return {models.User}     internal representation of a user
 */
function toAppUser(user) {
  return {
    name: user.name,
    username: user.screen_name.toLowerCase(),
    id: user.id_str,
    followers: user.followers_count,
    tweets: user.statuses_count,
    verified: user.verified,
    protected: user.protected,
    image: user.profile_image_url_https
  };
}

/**
 * @return {boolean} True if tweet is not a re-tweet or not in english
 */
function englishAndNoRetweet(tweet) {
  return tweet.lang === 'en' && !tweet.retweeted;
}

/**
 * Create a TwitterHelper object
 * @param {Object} config configuration file that has the
 * app credentials.
 */
function TwitterHelper(configs) {
  var self = this;
  this.count = 0;
  this.twit = [];

  configs.forEach(function (cfg) {
    self.twit.push(new Twitter(cfg));
  });
}

TwitterHelper.prototype.getInstance = function () {
  var instance = this.count % this.twit.length;
  this.count ++;

  console.log('instance', instance);
  return this.twit[instance];
};

/**
 * Get the tweets based on the given screenName.
 * Implemented with recursive calls that fetch up to 200 tweets in every call
 * Only returns english and original tweets (no retweets)
 */
TwitterHelper.prototype.getTweets = function (screenName, callback) {
  var self = this;
  var tweets = [];
  var params = {
    screenName: screenName,
    count: MAX_COUNT,
    exclude_replies: true,
    trim_user: true
  };

  var processTweets = function processTweets(_tweets) {
    // Check if _tweets its an error
    if (!util.isArray(_tweets)) {
      return callback(_tweets, null);
    }
    var items = _tweets
    .filter(englishAndNoRetweet)
    .map(toContentItem);

    tweets = tweets.concat(items);
    if (_tweets.length > 1) {
      params.max_id = _tweets[_tweets.length - 1].id - 1;
      self.getInstance().getUserTimeline(params, processTweets);
    } else {
      callback(null, tweets);
    }
  };
  self.getInstance().getUserTimeline(params, processTweets);
};

/**
 * Get twitter user from a screenName or user_id array
 * It looks at params to determinate what to use
 */
TwitterHelper.prototype.getUsers = function (params, callback) {
  console.log('getUsers:', params);

  this.getInstance().post('/users/lookup.json', params, function (users) {
    if (users.statusCode) {
      console.log('error getting the twitter users');
      callback(users);
    } else {
      callback(null, users.map(toAppUser.bind(null)));
    }
  });
};

/**
 * Gets Twitter user information based on screenName
 */
TwitterHelper.prototype.getUser = function (screenName, callback) {
  this.getInstance().showUser(screenName, function (user) {
    if (user.statusCode) {
      console.log(screenName, 'is not a valid twitter');
      callback(user);
    } else {
      callback(null, toAppUser(user));
    }
  });
};

module.exports = TwitterHelper;
