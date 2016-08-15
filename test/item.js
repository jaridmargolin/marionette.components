/*!
 * test/item.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'backbone.marionette',
  'item'
], function (assert, Marionette, ItemComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('item.js', function () {

  it('Should utilize ItemView.', function () {
    var component = new ItemComponent();
    assert.isInstanceOf(component.view, Marionette.ItemView);
  });

});


});