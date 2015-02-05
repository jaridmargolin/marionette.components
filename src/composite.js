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
  entities: ['model', 'collection']

});


});