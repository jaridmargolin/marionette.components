/*!
 * collection.js
 * 
 * Copyright (c) 2014
 */

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Base = require('./base');


/* -----------------------------------------------------------------------------
 * CollectionComponent
 * ---------------------------------------------------------------------------*/

module.exports = Base.extend({

  // Default to CollectionView
  View: Marionette.CollectionView,
  Collection: Backbone.Collection,
  entities: ['collection']

});


