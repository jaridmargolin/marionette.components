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
    // components in each region. Key represents the region
    // and value is a reference to the component stored in
    // instance variable `children`.
    this.showing = {};

    Item.prototype.constructor.apply(this, arguments);    
  },


  /* ---------------------------------------------------------------------------
   * create & show
   * -------------------------------------------------------------------------*/

  /**
   * Show a component within a designated region.
   *
   * @public
   *
   * @param {string} regionName - Name of region to display component within.
   * @param {string} componentName - Name of component to display within region.
   * @param {constructor} Component - Class of component to instnatiate.
   * @param {object} options - Options to pass to component at instantiation.
   * @param {boolean} preventDestroy - Whether or not you should destroy the
   *   previous Component.
   */
  show: function (regionName, componentName, Component, options, preventDestroy) {
    var region = this.getRegion(regionName);
    var currentName = this.showing[regionName];
    var currentComponent = region[currentName];

    // life is easy when nothing needs to change
    if (currentName === componentName) {
      return currentComponent;
    }

    // if another view is currently being show and we don't
    // want to prevent its destruction...
    if (currentName && !preventDestroy) {
      this.destroyChild(currentComponent, regionName);
      delete region[currentName];
    }

    // if we don't exist yet, we should.
    if (!region[componentName]) {
      region[componentName] = this.createChild(Component, options, regionName);
    }

    // show
    this.showing[regionName] = componentName;
    this.view[regionName].show(region[componentName].view, {
      preventDestroy: preventDestroy
    });

    // return the new component
    return region[componentName];
  },

  /**
   * Create a child component. And bind entity events
   * to layout component.
   *
   * @private
   *
   * @param {constructor} Component - Component to instantiate.
   * @param {string} componentName - Name of component to create

   */
  createChild: function (Component, options, regionName) {
    var component = new Component(options || {});
    var events = this.getRegionEvents(regionName);

    this.bindEntityEvents(component, events);

    return component;
  },


  /* ---------------------------------------------------------------------------
   * destroy
   * -------------------------------------------------------------------------*/

  /**
   * Called on controller destroy. Used to destroy children
   * components and clean up any bound events.
   *
   * @private
   */
  destroy: function () {
    _.each(this.children, this.destroyRegionChildren, this);

    Item.prototype.destroy.apply(this, arguments);
  },

  /**
   * Destroy all components in a given region.
   *
   * @private
   *
   * @param {object} region - children region object.
   * @param {string} regionName - Name of region to destroy.
   */
  destroyRegionChildren: function (region, regionName) {
    _.each(region, function (component, componentName) {
      this.destroyChild(component, regionName);
    }, this);

    delete this.children[regionName];
  },

  /**
   * Destroy a child component. And unbind entity events
   * from layout component.
   *
   * @private
   *
   * @param {object} component - component to destroy.
   * @param {string} componentName - Name of component to destroy.
   * @param {string} regionName - Name of region used to unbind component
   *   events.
   */
  destroyChild: function (component, regionName) {
    var events = this.getRegionEvents(regionName);
    this.unbindEntityEvents(component, events);
    component.destroy();
  },


  /* ---------------------------------------------------------------------------
   * utils
   * -------------------------------------------------------------------------*/

  /**
   * Return events hash for given 
   *
   * @private
   *
   * @param {string} regionName - Get events hash for a given region.
   */
  getRegionEvents: function (regionName) {
    return this.getOption(regionName + 'Events');
  },

  /**
   * Get region contents from children. If no region exists
   * set and return empty object.
   *
   * @private
   *
   * @param {string} regionName - Name of region to return children
   *   contents from.
   */
  getRegion: function (regionName) {
    var region = this.children[regionName] = this.children[regionName] || {};
    
    return region;
  }

});


