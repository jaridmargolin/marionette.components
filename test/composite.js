/*!
 * test/composite.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'backbone',
  'backbone.marionette',
  'composite'
], function (assert, sinon, Backbone, Marionette, CollectionComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('composite.js', function () {

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
      this.MyModel = Backbone.Model.extend({});
      this.MyCollection = Backbone.Collection.extend({});

      this.MyComponent = this.MyComponent.extend({
        Model: this.MyModel,
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' },
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

    it('Should use Model class from component.', function () {
      assert.isInstanceOf(this.component.model, this.MyModel);
    });

    it('Should use model instance from component.', function () {
      var model = new Backbone.Model();

      var MyCustomComponent = this.MyComponent.extend({
        model: model
      });

      var component = new MyCustomComponent();

      assert.equal(component.model, model);
    });

    it('Should bind model events from component.', function () {
      this.component.model.trigger.call(this.component.model, 'test');

      assert.isTrue(this.component.tested);
    });

  });


  /* ---------------------------------------------------------------------------
   * Options passed on instnatiation
   * -------------------------------------------------------------------------*/

  describe('Options passed on instnatiation.', function () {

    beforeEach(function () {
      this.MyModel = Backbone.Model.extend({});
      this.MyCollection = Backbone.Collection.extend({});

      this.component = new this.MyComponent({
        Model: this.MyModel,
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' },
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

    it('Should use Model class from component.', function () {
      assert.isInstanceOf(this.component.model, this.MyModel);
    });

    it('Should use model instance from component.', function () {
      var model = new Backbone.Model();

      var component = new this.MyComponent({
        model: model
      });

      assert.equal(component.model, model);
    });

    it('Should bind model events to component.', function () {
      this.component.model.trigger.call(this.component.model, 'test');
      assert.isTrue(this.component.tested);
    });

  });

});


});