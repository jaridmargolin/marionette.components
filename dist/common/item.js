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

  /**
   * Attach and return object with model instance.
   *
   * @private
   */
  createEntities: function () {
    return {
      model: this._createEntity('model')
    };
  }

});


