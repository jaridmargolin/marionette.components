/*!
 * test/layout.js
 * 
 * Copyright (c) 2014
 */

define([
  'jquery',
  'underscore',
  'proclaim',
  'sinon',
  'layout',
  'item'
], function ($, _, assert, sinon, LayoutComponent, ItemComponent) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('layout.js', function () {

  beforeEach(function () {
    var template = _.template('<div id="r1">');

    var MyLayoutComponent = LayoutComponent.extend({
      r1Events: {
        'test': '_onTest'
      },
      _onTest: function () {
        this.tested = true;
      }
    });

    this.layoutComponent = new MyLayoutComponent({
      viewOptions: {
        el: '#workboard',
        regions: { 'r1': '#r1' },
        template: template
      }
    });

    this.Component1 = ItemComponent.extend({
      viewOptions: {
        className: 'c1',
        template: false
      }
    });

    this.Component2 = ItemComponent.extend({
      viewOptions: {
        className: 'c2',
        template: false
      }
    });

    this.layoutComponent.view.render();
  });

  it('Should show component view in region.', function () {
    this.layoutComponent.show('r1', 'component1', this.Component1);
    
    assert.ok($('.c1')[0]);
    assert.ok(this.layoutComponent.children['r1']['component1']);
  });

  it('Should destroy previous component in region.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var destroySpy = sinon.spy(c1, 'destroy');

    this.layoutComponent.show('r1', 'component2', this.Component2);

    assert.isTrue(destroySpy.calledOnce);
  });

  it('Should remove previous component from children store.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var destroySpy = sinon.spy(c1, 'destroy');

    this.layoutComponent.show('r1', 'component1', this.Component1);
    this.layoutComponent.show('r1', 'component2', this.Component2);

    assert.notOk(this.layoutComponent.children['r1:component1']);
    assert.isTrue(destroySpy.calledOnce);
  });

  it('Should prevent destroy of previous component in region.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var destroySpy = sinon.spy(c1, 'destroy');

    this.layoutComponent.show('r1', 'component1', this.Component1);
    this.layoutComponent.show('r1', 'component2', this.Component2, {}, true);

    assert.ok(this.layoutComponent.children['r1']['component1']);
    assert.isTrue(destroySpy.notCalled);
  });

  it('Should show existing component.', function () {
    this.layoutComponent.show('r1', 'component1', this.Component1);
    this.layoutComponent.show('r1', 'component2', this.Component2, {}, true);

    var createSpy = sinon.spy(this.layoutComponent, 'createChild');

    this.layoutComponent.show('r1', 'component1', this.Component1);

    assert.ok($('.c1')[0]);
    assert.isTrue(createSpy.notCalled);
  });

  it('Should bind to region component events.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    c1.trigger('test');

    assert.isTrue(this.layoutComponent.tested);
  });

  it('Should destroy all children components.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var c2 = this.layoutComponent.show('r1', 'component2', this.Component2, {}, true);

    var destroySpy1 = sinon.spy(c1, 'destroy');
    var destroySpy2 = sinon.spy(c2, 'destroy');

    this.layoutComponent.destroy();

    assert.isTrue(destroySpy1.calledOnce);
    assert.isTrue(destroySpy2.calledOnce);
  });

});


});