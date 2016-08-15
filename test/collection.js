/*!
 * test/collection.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'backbone.marionette',
  'collection'
], function (assert, Marionette, CollectionComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('collection.js', function () {

  it('Should utilize CollectionView.', function () {
    var component = new CollectionComponent();
    assert.isInstanceOf(component.view, Marionette.CollectionView);
  });

});


});