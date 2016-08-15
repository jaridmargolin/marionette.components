/*!
 * collection.js
 * 
 * Copyright (c) 2014
 */

define([
  'backbone.marionette',
  './base'
], function (Marionette, Base) {


/* -----------------------------------------------------------------------------
 * CollectionComponent
 * ---------------------------------------------------------------------------*/

return Base.extend({

  View: Marionette.CollectionView

});


});