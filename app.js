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

require('dotenv').config();

var express = require('express');
var app = express();
// var TwitterHelper = require('./twitter-helper');
// var watson = require('watson-developer-cloud');
//
// var twitter = new TwitterHelper(process.env.TWITTER ? JSON.parse(process.env.TWITTER) : [{
//   consumer_key: '<consumer_key>',
//   consumer_secret: '<consumer_secret>',
//   access_token_key: '<access_token_key>',
//   access_token_secret: '<access_token_secret>'
// }]);
//
// var personalityInsights = watson.personality_insights({
//   url: 'https://gateway.watsonplatform.net/personality-insights/api',
//   username: '<username>',
//   password: '<password>',
//   version: 'v2'
// });

// Bootstrap application settings
require('./config/express')(app);

app.get('/', function (req, res) {
  console.log('session:', req.session);
  if (!req.session.id) {
    res.render('welcome');
  } else {
    res.render('welcome-logged-in');
  }
});

app.get('/offline', function offline(req, res) {
  console.log('session:', req.session);
  res.render('offline');
});

app.get('/dashboard', function dashboard(req, res) {
  console.log('session:', req.session);
  res.render('dashboard');
});

app.get('/insights', function insights(req, res) {
  console.log('session:', req.session);
  res.render('insights');
});

app.get('/logout', function logout(req, res) {
  console.log('session:', req.session);
  req.session = null;
  res.redirect('/');
});

app.post('/tracker', function tracker(req, res) {
  console.log('/tracker', req.session);
  res.json({});
});

app.get('/user', function findOrCreateUser(req, res) {
  if (!req.session.id) {
    req.session.id = new Date();
    req.session.gretting = 'Hello';
    req.session.image = '/images/watson.jpg';
    req.session.role = 'company leader';
  }
  res.json({ id: req.session.id });
});

app.post('/user', function updateUser(req, res) {
  req.session.twitter_id = req.body.twitter_id || 'ibmwatson';
  req.session.email = req.query.email;
  res.json({ status: 'success' });
});

app.get('/api/personality-insights', function pi(req, res) {
  console.log('Personality Insights for twitter:', req.query.twitter_id);
  res.json(require('./test/resources/profile.json'));
});

require('./config/error-handler')(app);

module.exports = app;
