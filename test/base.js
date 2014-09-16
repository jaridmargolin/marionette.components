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
      var MyComponent = this.MyComponent.extend({
        viewOptions: { 'test': true },
        viewEvents: { 'test': '_onTest' }
      });

      this.component = new MyComponent();
    });

    it('Should pass viewOptions to View on instnatiation.', function () {
      assert.isTrue(this.component.view.options.test);
    });

    it('Should bind view events from component.', function () {
      this.component.view.trigger.call(this.component.view, 'test');
      assert.isTrue(this.component.tested);
    });

  });


  /* ---------------------------------------------------------------------------
   * Options passed on instnatiation
   * -------------------------------------------------------------------------*/

  describe('Options passed on instnatiation.', function () {

    beforeEach(function () {
      this.component = new this.MyComponent({
        viewOptions: { 'test': true },
        viewEvents: { 'test': '_onTest' }
      });
    });

    it('Should pass viewOptions to View on instnatiation.', function () {
      assert.isTrue(this.component.view.options.test);
    });

    it('Should bind view events to component.', function () {
      this.component.view.trigger.call(this.component.view, 'test');
      assert.isTrue(this.component.tested);
    });

  });

});


});