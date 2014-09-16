/*!
 * marionette.components.js
 * 
 * Copyright (c) 2014
 */

var Base = require('./base');
var Collection = require('./collection');
var Composite = require('./composite');
var Item = require('./item');
var Layout = require('./layout');


/* -----------------------------------------------------------------------------
 * marionette.components
 * ---------------------------------------------------------------------------*/

module.exports = {
  BaseComponent: Base,
  CollectionComponent: Collection,
  CompositeComponent: Composite,
  ItemComponent: Item,
  LayoutComponent: Layout
};


