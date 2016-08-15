/*!
 * test/composite.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'backbone.marionette',
  'composite'
], function (assert, Marionette, CompositeComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('composite.js', function () {

  it('Should utilize CompositeView.', function () {
    var component = new CompositeComponent();
    assert.isInstanceOf(component.view, Marionette.CompositeView);
  });

});


});