/*!
 * collection.js
 * 
 * Copyright (c) 2014
 */

var Marionette = require('backbone.marionette');
var Base = require('./base');


/* -----------------------------------------------------------------------------
 * CollectionComponent
 * ---------------------------------------------------------------------------*/

module.exports = Base.extend({

  View: Marionette.CollectionView

});


