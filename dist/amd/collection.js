/*!
 * collection.js
 * 
 * Copyright (c) 2014
 */

define([
  'backbone',
  'backbone.marionette',
  './base'
], function (Backbone, Marionette, Base) {


/* -----------------------------------------------------------------------------
 * CollectionComponent
 * ---------------------------------------------------------------------------*/

return Base.extend({

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


});