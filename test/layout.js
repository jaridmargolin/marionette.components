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
    var $workboard = $('#workboard');
    var template = _.template('<div id="r1"></div><div id="r2"></div>');

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
        regions: { 'r1': '#r1', 'r2': '#r2' },
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

    $workboard.html(this.layoutComponent.view.render().el);
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

    assert.notOk(this.layoutComponent.children['r1']['component1']);
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

    var createSpy = sinon.spy(this.layoutComponent, 'createInstance');

    this.layoutComponent.show('r1', 'component1', this.Component1);

    assert.ok($('.c1')[0]);
    assert.isTrue(createSpy.notCalled);
  });

  it('Should bind to region component events.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    c1.trigger('test');

    assert.isTrue(this.layoutComponent.tested);
  });

  it('Should return component shown in specified region.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);

    assert.equal(this.layoutComponent.showingIn('r1'), c1);
  });

  it('Should destroy all region components.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var c2 = this.layoutComponent.show('r1', 'component2', this.Component2, {}, true);

    var destroySpy1 = sinon.spy(c1, 'destroy');
    var destroySpy2 = sinon.spy(c2, 'destroy');

    this.layoutComponent.emptyRegion('r1');

    assert.notOk(this.layoutComponent.children['r1']);
    assert.notOk(this.layoutComponent.showing['r1']);
    assert.isTrue(destroySpy1.calledOnce);
    assert.isTrue(destroySpy2.calledOnce);
  });

  it('Should destroy components for all regions.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    var c2 = this.layoutComponent.show('r2', 'component2', this.Component2, {}, true);

    var destroySpy1 = sinon.spy(c1, 'destroy');
    var destroySpy2 = sinon.spy(c2, 'destroy');

    this.layoutComponent.empty();

    assert.notOk(this.layoutComponent.children['r1']);
    assert.notOk(this.layoutComponent.children['r2']);
    assert.notOk(this.layoutComponent.showing['r1']);
    assert.notOk(this.layoutComponent.showing['r2']);
    assert.isTrue(destroySpy1.calledOnce);
    assert.isTrue(destroySpy2.calledOnce);
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

  it('Should hide component within specified region.', function () {
    var c1 = this.layoutComponent.show('r1', 'component1', this.Component1);
    this.layoutComponent.hide('r1');

    assert.equal(this.layoutComponent.children['r1']['component1'].instance, c1);
    assert.notOk(this.layoutComponent.showing['r1']);
    assert.notOk(this.layoutComponent.view['r1'].currentView);
  });

});


});