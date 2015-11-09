/*!
 * item.js
 * 
 * Copyright (c) 2014
 */

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Base = require('./base');


/* -----------------------------------------------------------------------------
 * ItemComponent
 * ---------------------------------------------------------------------------*/

module.exports = Base.extend({

  // Default to ItemView
  View: Marionette.ItemView,
  Model: Backbone.Model,
  Collection: Backbone.Collection,
  entities: ['model', 'collection']

});


