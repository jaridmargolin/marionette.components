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
  Collection: Backbone.Collection,
  entities: ['model', 'collection']

});


});