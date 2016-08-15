/*!
 * composite.js
 * 
 * Copyright (c) 2014
 */

var Marionette = require('backbone.marionette');
var Base = require('./base');


/* -----------------------------------------------------------------------------
 * CompositeComponent
 * ---------------------------------------------------------------------------*/

module.exports = Base.extend({

  View: Marionette.CompositeView

});


