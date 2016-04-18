/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

module.exports = function exports(app) {
  // Configure Express
  app.set('view engine', 'jade');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({}));

  // Setup static public directory
  app.use(express.static(__dirname + '/../public'));

  // 3. cookies
  app.use(cookieSession({
    name: 'session',
    secret: 'b4tm4n'
  }));

  app.locals.applications = require('../data/applications.json');

  app.all('*', function setSession(req, res, next) {
    if (req.session) {
      res.locals.session = req.session;
    }
    next();
  });

  // When running in Bluemix add rate-limitation
  // and some other features around security
  if (process.env.VCAP_APPLICATION) {
    require('./security')(app);
  }
};
