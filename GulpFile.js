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

var elixir = require('laravel-elixir');

elixir(function (mix) {
  mix.sass(['theme.scss'], 'public/css/theme.css');

  mix.scripts([
    'plugins/jquery.js',
    'plugins/tween-max.js',
    'plugins/vue.js',
    'plugins/modernizr.js',
    'plugins/hammer-time.js',
    'plugins/equal-height.js',
    'plugins/slick.js',
    'plugins/d3.js',
    'plugins/bootstrap.js',
    'plugins',
    'custom'
  ], 'public/js/theme.js');
});
