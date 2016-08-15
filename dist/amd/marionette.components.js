/*!
 * marionette.components.js
 * 
 * Copyright (c) 2014
 */

define([
  './base',
  './collection',
  './composite',
  './item',
  './layout'
],function (Base, Collection, Composite, Item, Layout) {


/* -----------------------------------------------------------------------------
 * marionette.components
 * ---------------------------------------------------------------------------*/

return {
  BaseComponent: Base,
  CollectionComponent: Collection,
  CompositeComponent: Composite,
  ItemComponent: Item,
  LayoutComponent: Layout
};


});