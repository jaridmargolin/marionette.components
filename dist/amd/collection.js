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
  entities: ['collection']

});


});