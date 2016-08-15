/*!
 * composite.js
 * 
 * Copyright (c) 2014
 */

define([
  'backbone.marionette',
  './base'
], function (Marionette, Base) {


/* -----------------------------------------------------------------------------
 * CompositeComponent
 * ---------------------------------------------------------------------------*/

return Base.extend({

  View: Marionette.CompositeView

});


});