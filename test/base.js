/*!
 * test/base.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'backbone.marionette',
  'base'
], function (assert, sinon, Marionette, BaseComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('base.js', function () {

  beforeEach(function () {
    this.MyComponent = BaseComponent.extend({
      View: Marionette.View,
      _onTest: function () {
        this.tested = true;
      }
    });

    this.component = new this.MyComponent();
  });

  it('Should throw if no View is specified.', function () {
    assert.throws(function () {
      new BaseComponent();
    }, '`View` must to be defined.');
  });

  it('Should create new View instance and attach to component.', function () {
    assert.isInstanceOf(this.component.view, this.component.View);
  });

  it('Should stopListening on destroy.', function () {
    var stopListeningSpy = sinon.spy(this.component, 'stopListening');
    this.component.destroy();

    assert.isTrue(stopListeningSpy.calledOnce);
  });

  it('Should destroy component view on destroy.', function () {
    var destroySpy = sinon.spy(this.component.view, 'destroy');
    this.component.destroy();

    assert.isTrue(destroySpy.calledOnce);
  });


  /* ---------------------------------------------------------------------------
   * Options added to prototype
   * -------------------------------------------------------------------------*/

  describe('Options added to prototype.', function () {

    beforeEach(function () {
      this.MyModel = Backbone.Model.extend({});

      this.MyComponent = this.MyComponent.extend({
        Model: this.MyModel,
        viewOptions: { 'test': true },
        viewEvents: { 'test': '_onTest' },
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' }
      });

      this.component = new this.MyComponent();
    });

    it('Should pass viewOptions to View on instnatiation.', function () {
      assert.isTrue(this.component.view.options.test);
    });

    it('Should bind view events from component.', function () {
      this.component.view.trigger.call(this.component.view, 'test');
      assert.isTrue(this.component.tested);
    });

    it('Should use Model class from component.', function () {
      assert.isInstanceOf(this.component.model, this.MyModel);
    });

    it('Should use model instance from component.', function () {
      var model = new Backbone.Model();
      var MyCustomComponent = this.MyComponent.extend({ model: model });
      var component = new MyCustomComponent();

      assert.equal(component.model, model);
    });

    it('Should use model fn from component.', function () {
      var model = function () { return new this.Model(); };
      var MyCustomComponent = this.MyComponent.extend({ model: model });
      var component = new this.MyComponent();

      assert.isInstanceOf(component.model, this.MyModel);
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
        viewOptions: { 'test': true },
        viewEvents: { 'test': '_onTest' },
        modelOptions: { 'test': true },
        modelEvents: { 'test': '_onTest' }
      });
    });

    it('Should pass viewOptions to View on instnatiation.', function () {
      assert.isTrue(this.component.view.options.test);
    });

    it('Should bind view events to component.', function () {
      this.component.view.trigger.call(this.component.view, 'test');
      assert.isTrue(this.component.tested);
    });

    it('Should use Model class from component.', function () {
      assert.isInstanceOf(this.component.model, this.MyModel);
    });

    it('Should use model instance from component.', function () {
      var model = new Backbone.Model();
      var component = new this.MyComponent({ model: model });

      assert.equal(component.model, model);
    });

    it('Should use model fn from component.', function () {
      var model = function () { return new Backbone.Model(); };
      var component = new this.MyComponent({ model: model });

      assert.isInstanceOf(component.model, Backbone.Model);
    });

    it('Should bind model events to component.', function () {
      this.component.model.trigger.call(this.component.model, 'test');
      assert.isTrue(this.component.tested);
    });
  });

});


});