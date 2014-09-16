/*!
 * test/item.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'backbone',
  'backbone.marionette',
  'item'
], function (assert, sinon, Backbone, Marionette, ItemComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('item.js', function () {

  beforeEach(function () {
    this.MyComponent = ItemComponent.extend({
      _onTest: function () {
        this.tested = true;
      }
    });

    this.component = new this.MyComponent();
  });

  it('Should create new Model instance and attach to component.', function () {
    assert.isInstanceOf(this.component.model, this.component.Model);
  });

  it('Should pass new Model instance to View instnatiation.', function () {
    assert.ok(this.component.view.model);
  });


  /* ---------------------------------------------------------------------------
   * Options added to prototype
   * -------------------------------------------------------------------------*/

  describe('Options added to prototype.', function () {

    beforeEach(function () {
      this.MyModel = Backbone.Model.extend({});

      this.MyComponent = this.MyComponent.extend({
        Model: this.MyModel,
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' }
      });

      this.component = new this.MyComponent();
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

      this.component = new this.MyComponent({
        Model: this.MyModel,
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' }
      });
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