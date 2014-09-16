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

  /**
   * Attach and return object with collection instance.
   *
   * @private
   */
  createEntities: function () {
    return {
      collection: this._createEntity('collection')
    };
  }

});


