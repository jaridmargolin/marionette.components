/*!
 * base.js
 * 
 * Copyright (c) 2014
 */

var Marionette = require('backbone.marionette');


/* -----------------------------------------------------------------------------
 * Base
 *
 * Not intended to be used directly. Provides base functionality for
 * CollectionComponent, CompositeComponent, ItemComponent, and LayoutComponent.
 * ---------------------------------------------------------------------------*/

module.exports = Marionette.Object.extend({

  /**
   * Overwrite Marionette.Object constructor to add a createComponent
   * step inbetween setting options and initialize call.
   *
   * @example
   * var controller = new Component({ View: ItemView });
   *
   * @constructor
   * @public
   *
   * @param {object} options - Object options.
   */
  constructor: function (options) {
    this.options = _.extend({}, _.result(this, 'options'), options);
    this.createView();

    this.initialize.apply(this, arguments);
  },

  /**
   * Instnatiate our view passing in any defined entities.
   *
   * @private
   *
   * @param {object} options - Object options passed to constructor.
   */
  createView: function () {
    var View = this.getRequired('View');
    var defaults = this.createEntities();
    var options = this.getOption('viewOptions');

    // Render yo!
    this.view = new View(_.extend({}, defaults, options));
    this._bindInstanceEvents('view');
  },

  /**
   * Bind instance events to component.
   *
   * @private
   *
   * @param {string} instanceName - Name of instance to bind events from.
   */
  _bindInstanceEvents: function (instanceName) {
    var instance = this[instanceName];
    var eventsName = instanceName + 'Events';

    this.bindEntityEvents(instance, this.getOption(eventsName));
  },

  /**
   * Create entities to be passed to your view. Base class by default
   * does not create or return any entities. CollectionComponent for
   * example would attach this.collection and return an object with
   * a collection key whos value is the newly created collection.
   *
   * @private
   */
  createEntities: function () {
    return {};
  },

  /**
   * Create entity (if not yet created). Add instance to component
   * and bind all instance events to component.
   *
   * @private
   *
   * @param {string} instanceName - Name of class to create/retrieve.
   */
  _createEntity: function (instanceName) {
    var instance = this[instanceName] = this._getEntity(instanceName);
    this._bindInstanceEvents(instanceName);

    return instance;
  },

  /**
   * Retreive pre-existing declared instance, or create a new
   * instance.
   *
   * @private
   *
   * @param {string} instanceName - Name of class to create/retrieve.
   */
  _getEntity: function (instanceName) {
    var instance = this.getOption(instanceName);

    if (instance) {
      return instance;
    }

    var objName = instanceName.substring(0, 1).toUpperCase() + instanceName.substring(1);
    var Obj = this.getOption(objName);

    return new Obj();
  },

  /**
   * Component clean up by destroying child view. Object.prototype.destroy
   * automatically stops listening to all events.
   *
   * @public
   */
  destroy: function() {
    // Clean up by destroying nested view.
    this.view.destroy();

    Marionette.Object.prototype.destroy.apply(this);
  },

  /**
   * Make sure prop is defined on our instance or
   * in our instance options object.
   *
   * @public
   *
   * @param {string} name - Name of property we are checking
   *   existance of.
   */
  getRequired: function (name) {
    var option = this.getOption(name);

    if (!option) {
      throw new Error('`' + name + '` must to be defined.');
    }

    return option;
  }

});


