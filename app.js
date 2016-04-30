/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

require('dotenv').config({
  silent: true
});

var express = require('express');
var app = express();
var TwitterHelper = require('./twitter-helper');
var watson = require('watson-developer-cloud');

var twitter = new TwitterHelper(process.env.TWITTER ? JSON.parse(process.env.TWITTER) : [{
  consumer_key: '<consumer_key>',
  consumer_secret: '<consumer_secret>',
  access_token_key: '<access_token_key>',
  access_token_secret: '<access_token_secret>'
}]);

var personalityInsights = watson.personality_insights({
  url: 'https://gateway.watsonplatform.net/personality-insights/api',
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

// Bootstrap application settings
require('./config/express')(app);

app.get('/', function (req, res) {
  if (!req.session.id) {
    res.render('welcome');
  } else {
    res.render('welcome-logged-in');
  }
});

app.get('/offline', function offline(req, res) {
  res.render('offline');
});

app.get('/dashboard', function dashboard(req, res) {
  res.render('dashboard');
});

app.get('/insights', function insights(req, res) {
  res.render('insights');
});

app.get('/logout', function logout(req, res) {
  req.session = null;
  res.redirect('/');
});

app.get('/user', function findOrCreateUser(req, res) {
  if (!req.session.id) {
    req.session = {
      id: new Date(),
      gretting: 'Hello',
      image: '/images/watson.jpg',
      role: 'developer'
    };
  }
  res.json({
    id: req.session.id
  });
});

app.post('/user', function updateUser(req, res, next) {
  var username = req.body.twitter_id || 'ibmwatson';
  username = username.replace(new RegExp('@', 'g'), '');
  req.session.twitter_id = username;
  req.session.email = req.query.email;
  twitter.getUser(req.session.twitter_id, function getUser(err, user) {
    if (err) {
      next(err);
    } else {
      req.session.gretting = 'Hello ' + user.name;
      req.session.image = user.image;
      req.session.name = user.name;
      res.json({
        status: 'success'
      });
    }
  });
});

app.get('/api/personality-insights', function pi(req, res, next) {
  var username = req.query.twitter_id;
  if (username === 'ibmwatson') {
    return res.json(require('./test/resources/profile.json'));
  }
  console.log('Getting the tweets for:', username);
  twitter.getTweets(username, function getTweets(err, tweets) {
    if (err) {
      next(err);
    } else {
      console.log(username, 'has', tweets.length, 'tweets');
      personalityInsights.profile({
        contentItems: tweets
      }, function getProfile(error, profile) {
        if (error) {
          next(error);
        } else {
          res.json(profile);
        }
      });
    }
  });
});

require('./config/error-handler')(app);

module.exports = app;
