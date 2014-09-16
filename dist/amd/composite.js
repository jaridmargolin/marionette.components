/*!
 * composite.js
 * 
 * Copyright (c) 2014
 */

define([
  'backbone',
  'backbone.marionette',
  './base'
], function (Backbone, Marionette, Base) {


/* -----------------------------------------------------------------------------
 * CompositeComponent
 * ---------------------------------------------------------------------------*/

return Base.extend({

  // Default to CompositeView
  View: Marionette.CompositeView,
  Model: Backbone.Model,
  Collection: Backbone.Collection,

  /**
   * Attach and return object with collection and model instances.
   *
   * @private
   */
  createEntities: function () {
    return {
      model: this._createEntity('model'),
      collection: this._createEntity('collection')
    };
  }

});


});