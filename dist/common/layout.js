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
   * @param {constructor} Constructor - Constructor of component to instnatiate.
   * @param {object} options - Options to pass to component at instantiation.
   * @param {boolean} preventDestroy - Whether or not you should destroy the
   *   previous Component.
   */
  show: function (regionName, componentName, Constructor, options, preventDestroy) {
    var regionChildren = this.getRegionChildren(regionName);
    var showing = this.showing[regionName]; 
    var cached = regionChildren[componentName];

    // create base child object
    var child = this.createChild(componentName, Constructor, options);

    // life is easy when nothing needs to change
    if (showing && this.isIdentical(showing, child)) {
      return showing.instance;
    }

    // if another view is currently being shown and we don't
    // want to prevent its destruction...
    if (showing && !preventDestroy) {
      this.destroyChild(regionName, showing);
      delete regionChildren[showing.name];
    }

    // if we have a cached component but it is not identical
    // we need to destroy it.
    if (cached && !this.isIdentical(cached, child)) {
      this.destroyChild(regionName, cached);
      delete regionChildren[componentName];
    }

    // make sure our child has an instance, either by creation
    // or lookup.
    if (regionChildren[componentName]) {
      child.instance = regionChildren[componentName].instance;
    } else {
      child.instance = this.createInstance(regionName, child);
    }

    // set child in region children store.
    regionChildren[componentName] = child;

    // set current showing
    this.showing[regionName] = child;
    this.view[regionName].show(child.instance.view, {
      preventDestroy: preventDestroy
    });

    // return the new component
    return child.instance;
  },

  /**
   * Create and return child object.
   *
   * @private
   *
   * @param {string} componentName - Name of component to display within region.
   * @param {constructor} Constructor - Constructor of component to instnatiate.
   * @param {object} options - Options to pass to component at instantiation.
   */
  createChild: function (componentName, Constructor, options) {
    return { 
      name: componentName,
      Constructor: Constructor,
      options: options
    };
  },

  /**
   * Create a child component. And bind entity events
   * to layout component.
   *
   * @private
   *
   * @param {constructor} Constructor - Constructor to instantiate.
   * @param {string} componentName - Name of component to create
   */
  createInstance: function (regionName, child) {
    var component = new child.Constructor(child.options || {});
    var events = this.getRegionEvents(regionName);

    this.bindEntityEvents(component, events);

    return component;
  },


  /* ---------------------------------------------------------------------------
   * empty
   * -------------------------------------------------------------------------*/

  /**
   * Loop over all regions with children components, and destroy
   * components/remove event bindings.
   *
   * @public
   */
  empty: function () {
    _.each(this.children, function (regions, regionName) {
      this.emptyRegion(regionName);
    }, this);
  },

  /**
   * Empty a given region by name. If no region is provided
   * all regions will be empty. Pretty much just a wrapper around
   * destroyRegionChildren.
   *
   * @public
   *
   * @param {string} regioName - Name of region to empty
   */
  emptyRegion: function (regionName) {
    this.destroyRegionChildren(this.children[regionName], regionName);
    delete this.showing[regionName];
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
    _.each(region, function (child, componentName) {
      this.destroyChild(regionName, child);
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
  destroyChild: function (regionName, child) {
    var events = this.getRegionEvents(regionName);
    this.unbindEntityEvents(child.instance, events);
    child.instance.destroy();
  },


  /* ---------------------------------------------------------------------------
   * utils
   * -------------------------------------------------------------------------*/

  /**
   * Return the component being show in a given region.
   *
   * @public
   *
   * @param {string} regionName - Name of region to grab current shown
   *   component from.
   */
  showingIn: function (regionName) {
    var showing = this.showing[regionName];

    return showing
      ? showing.instance
      : null;
  },

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
  getRegionChildren: function (regionName) {
    return this.children[regionName] = this.children[regionName] || {};
  },

  /**
   * Overrideable method to determine when a 
   */
  isIdentical: function (child1, child2) {
    var name = child1.name === child2.name;
    var cons = child1.Constructor === child2.Constructor;

    return name && cons;
  }

});


