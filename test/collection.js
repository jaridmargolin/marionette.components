/*!
 * test/collection.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'backbone',
  'backbone.marionette',
  'collection'
], function (assert, sinon, Backbone, Marionette, CollectionComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('collection.js', function () {

  beforeEach(function () {
    this.MyComponent = CollectionComponent.extend({
      _onTest: function () {
        this.tested = true;
      }
    });

    this.component = new this.MyComponent();
  });

  it('Should create new Collection instance and attach to component.', function () {
    assert.isInstanceOf(this.component.collection, this.component.Collection);
  });

  it('Should pass new Collection instance to View instnatiation.', function () {
    assert.ok(this.component.view.collection);
  });


  /* ---------------------------------------------------------------------------
   * Options added to prototype
   * -------------------------------------------------------------------------*/

  describe('Options added to prototype.', function () {

    beforeEach(function () {
      this.MyCollection = Backbone.Collection.extend({});

      this.MyComponent = this.MyComponent.extend({
        Collection: this.MyCollection,
        collectionOptions: { 'test': true },
        collectionEvents: { 'test': '_onTest' }
      });

      this.component = new this.MyComponent();
    });

    it('Should use Collection class from component.', function () {
      assert.isInstanceOf(this.component.collection, this.MyCollection);
    });

    it('Should use collection instance from component.', function () {
      var collection = new Backbone.Collection();

      var MyCustomComponent = this.MyComponent.extend({
        collection: collection
      });

      var component = new MyCustomComponent();

      assert.equal(component.collection, collection);
    });

    it('Should bind collection events from component.', function () {
      this.component.collection.trigger.call(this.component.collection, 'test');

      assert.isTrue(this.component.tested);
    });

  });


  /* ---------------------------------------------------------------------------
   * Options passed on instnatiation
   * -------------------------------------------------------------------------*/

  describe('Options passed on instnatiation.', function () {

    beforeEach(function () {
      this.MyCollection = Backbone.Collection.extend({});

      this.component = new this.MyComponent({
        Collection: this.MyCollection,
        collectionOptions: { 'test': true },
        collectionEvents: { 'test': '_onTest' }
      });
    });

    it('Should use Collection class from component.', function () {
      assert.isInstanceOf(this.component.collection, this.MyCollection);
    });

    it('Should use collection instance from component.', function () {
      var collection = new Backbone.Collection();

      var component = new this.MyComponent({
        collection: collection
      });

      assert.equal(component.collection, collection);
    });

    it('Should bind collection events to component.', function () {
      this.component.collection.trigger.call(this.component.collection, 'test');
      assert.isTrue(this.component.tested);
    });

  });

});


});