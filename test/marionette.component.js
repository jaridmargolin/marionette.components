/*!
 * test/marionette.component.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'marionette.component'
], function (assert, sinon, Component) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('marionette.component.js', function () {

  it('Should expose components.', function () {
    assert.ok(Component.CollectionComponent);
    assert.ok(Component.CompositeComponent);
    assert.ok(Component.ItemComponent);
    assert.ok(Component.LayoutComponent);
  });

});


});