marionette.component [![Build Status](https://travis-ci.org/jaridmargolin/marionette.component.png)](https://travis-ci.org/jaridmargolin/marionette.component)
========================

A collection of Classes to interact with with Marionette.Views.

Views are for displaying and interacting with the DOM. Controllers are for handling app logic. Marionette.Component is a subclass of Marionette.Object that provides an api for interacting with views and their accompanying data (models/collection).

**Goals:**

* View, Model, and Collection instantiation should be managed by component lifecycle.
* View lifecycle should be coupled with Component (Calling `destroy` on a component, will call `destroy` on the component view).
* view, model, and collection instances should be attached to component for quick reference.
* viewEvents, modelEvents, and collectionEvents should be available for easy event management.
* Should be alble to `show` components in regions.

## Components

`Marionette.Component` includes a Component for each of the 4 Marionette.View types, as well as a Base class holding common functionality used by each of the Component subclasses.

* [BaseComponent](#basecomponent)
* [ItemComponent](#itemcomponent)
* [CollectionComponent](#collectioncomponent)
* [CompositeCompontent](#compositecomponent)
* [LayoutComponent](#layoutcomponent)


**Note**: I will use the term *declared* throughout the documentation. Declared refers to an option set on the Component prototype, or passed in to the component at instantiation through an options object.

### BaseComponent

Not intended to be used directly. All Components however, will inherit the majority of their functionality from this Class.

#### construcotr/initialize

A `View` must be declared. A `View` instance will be created and attached to the component. You may declare a `viewOptions` property to be passed to the view at instantiation.

#### events

* viewEvents

#### defining entities

Entities are intended to be passed to the View at instantiation. The BaseComponent does not pass any entities by default. You can change this behavior by overwriting the `createEntities` method. This method is used by all subclasses to setup entities for specific view. Below is an example of the `createEntities` method used in `ItemComponent`.

```
createEntities: function () {
  return {
    model: this._createEntity('model')
  };
}
```

The first attempt is to retrieve an existing declared model. If not found, a new Instance will be created.

#### destroy

Destroying a component will automatically destroy the component's view. No need to worry about manual cleanup :)

### ItemComponent

A subclass of `BaseComponent` intended to work in tandem with `Marionette.ItemView`.

#### construcotr/initialize

A View, `Marionette.ItemView`, and a Model, `Backbone.Model`, are set by default. Feel free to override by declaring your own.

#### events

* viewEvents
* modelEvents

### CollectionComponent

A subclass of `BaseComponent` intended to work in tandem with `Marionette.CollectionView`.

#### construcotr/initialize

A View, `Marionette.CollectionView`, and a Model, `Backbone.Collection`, are set by default. Feel free to override by declaring your own.

#### events

* viewEvents
* collectionEvents

### CompositeComponent

A subclass of `BaseComponent` intended to work in tandem with `Marionette.CompositeView`.

#### construcotr/initialize

A View, `Marionette.CompositeView`, a Model, `Backbone.Model`, and a Collection, `Backbone.Collection`, are set by default. Feel free to override by declaring your own.

#### events

* viewEvents
* modelsEvents
* collectionEvents

### LayoutComponent

A subclass of `BaseComponent` intended to work in tandem with `Marionette.LayoutView`. The LayoutComponent provides an additional API to handling and working with nested components.

#### construcotr/initialize

A View, `Marionette.CompositeView`, and a Model, `Backbone.Model`, are set by default. Feel free to override by declaring your own.

#### showing nested components

The `LayoutComponent` will handle instantiating new Components when they are passed into the show function. It will return the newly created component instance.

**Basic Usage:**
 
```
var nav = layoutComponent.show('region1', 'nav-main', NavComponent, {
  viewOptions: {}
});
```

The show command also accepts a 5th parameter `preventDestroy`. If passed, your Component will be kept alive and used if you attempt to display it again.

#### events

* viewEvents
* modelsEvents


## Temporary Example

Creating an example app would probably be more useful...

```
/* -----------------------------------------------------------------------------
 * App
 * ---------------------------------------------------------------------------*/
 
var AppView = Marionette.LayoutView.extend({
  el: 'body',
  template: _.template('<div id="header"></div><div id="body">') ,
  regions: {
    'header': '#header',
    'body': '#body'
  }
});

var App = MarionetteComponent.LayoutComponent.extend({
  View: AppView
});

/* -----------------------------------------------------------------------------
 * Nav
 * ---------------------------------------------------------------------------*/

var NavView = Marionette.ItemView.extend({
  template: _.template('<h1>{{title}}</h1>')
});

var Nav = MarionetteComponent.ItemComponent.extend({
  populate: function (options) {
    this.model.fetch(); 
  }
});

/* -----------------------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------------------*/

var PageView = Marionette.ItemView.extend({
  template: _.template('<h2>{{title}}</h2><p>{{body}}</p>')
});

var Page = MarionetteComponent.ItemComponent.extend({
  populate: function (options) {
    this.model.fetch(options);
  }
});

/* -----------------------------------------------------------------------------
 * Bringing it all together
 * ---------------------------------------------------------------------------*/

var app  = new App();
var nav  = app.show('header', 'nav', Nav);
var page = app.show('body', 'page1', Page);

nav.populate();
page.populate();

```

## Tests

**Install Dependencies**

```
npm install
```

**Run/View**

```
npm test
```

## License

The MIT License (MIT) Copyright (c) 2014 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.