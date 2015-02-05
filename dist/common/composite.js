/*!
 * composite.js
 * 
 * Copyright (c) 2014
 */

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Base = require('./base');


/* -----------------------------------------------------------------------------
 * CompositeComponent
 * ---------------------------------------------------------------------------*/

module.exports = Base.extend({

  // Default to CompositeView
  View: Marionette.CompositeView,
  Model: Backbone.Model,
  Collection: Backbone.Collection,
  entities: ['model', 'collection']

});


