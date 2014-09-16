/*!
 * test/marionette.components.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'marionette.components'
], function (assert, sinon, Component) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('marionette.components.js', function () {

  it('Should expose components.', function () {
    assert.ok(Component.CollectionComponent);
    assert.ok(Component.CompositeComponent);
    assert.ok(Component.ItemComponent);
    assert.ok(Component.LayoutComponent);
  });

});


});