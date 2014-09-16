/*!
 * item.js
 * 
 * Copyright (c) 2014
 */

define([
  'backbone',
  'backbone.marionette',
  './base'
], function (Backbone, Marionette, Base) {


/* -----------------------------------------------------------------------------
 * ItemComponent
 * ---------------------------------------------------------------------------*/

return Base.extend({

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


});