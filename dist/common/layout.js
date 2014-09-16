/*!
 * layout.js
 * 
 * Copyright (c) 2014
 */

var Marionette = require('backbone.marionette');
var Item = require('./item');


/* -----------------------------------------------------------------------------
 * LayoutComponent
 *
 * Currently blank :/ Need to dig through layoutView to see possible
 * integrations for making it easier to work with regions from a component.
 * ---------------------------------------------------------------------------*/

module.exports = Item.extend({

  // Default to LayoutView
  View: Marionette.LayoutView,

  /**
   * Sublcass constructor to store created components so they
   * can be instantiated and cleaned on destroy.
   *
   * @example
   * var controller = new Component({ View: ItemView });
   *
   * @constructor
   * @public
   *
   * @param {object} options - Object options.
   */
  constructor: function () {
    // Create an empty object to store created components.
    this.children = {};

    // Create an empty object to store currently shown
    // components in each region.
    this.showing = {};

    Item.prototype.constructor.apply(this, arguments);    
  },

  /**
   * Called on controller destroy. Used to destroy children
   * components and clean up any bound events.
   *
   * @private
   */
  destroy: function () {
    _.each(this.children, function (component, key) {
      var componentName = key.split(':')[1];

      this.destroyChild(componentName, component);
      delete this.children[key];
    }, this);

    Item.prototype.destroy.apply(this, arguments);
  },

  /**
   * Show a component within a designated region.
   *
   * @public
   *
   * @param {string} regionName - 
   * @param {string} componentName -
   * @param {constructor} Component -
   * @param {object} options -
   * @param {boolean} preventDestroy -
   */
  show: function (regionName, componentName, Component, options, preventDestroy) {
    var curName  = this.showing[regionName];
    var curIndex = [regionName, curName].join(':');
    var newIndex = [regionName, componentName].join(':');
    var isDiff   = curName !== componentName;

    // Life is easy when nothing needs to change
    if (!isDiff) {
      return this.children[curIndex];
    }

    // If another view is currently being show and we don't
    // want to prevent its destruction...
    if (curName && !preventDestroy) {
      this.destroyChild(curName, this.children[curIndex]);
      delete this.children[curIndex];
    }

    // If we don't exist yet, we should.
    if (!this.children[newIndex]) {
      this.children[newIndex] = this.createChild(Component, options, regionName);
    }

    // Show
    this.showing[regionName] = componentName;
    // Bind region controller events
    this.view[regionName].show(this.children[newIndex].view, {
      preventDestroy: preventDestroy
    });

    // return the new component
    return this.children[newIndex];
  },

  /**
   * Create a child component. And bind entity events
   * to layout component.
   *
   * @private
   *
   * @param {string} componentName -
   * @param {constructor} Component -
   */
  createChild: function (Component, options, regionName) {
    var component = new Component(options || {});
    var eventsName = regionName + 'Events';

    this.bindEntityEvents(component, this.getOption(eventsName));

    return component;
  },

  /**
   * Destroy a child component. And unbind entity events
   * from layout component.
   *
   * @private
   *
   * @param {string} componentName -
   * @param {constructor} Component -
   */
  destroyChild: function (componentName, component) {
    var eventsName = componentName + 'Events';

    this.unbindEntityEvents(component, this.getOption(eventsName));
    component.destroy();
  }

});


