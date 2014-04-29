AGoodListener.js
================

Allows you to find out what JavasSript events are attached to elements in the DOM. This is useful for testing scenarios when you need to know if certain events have been attached to elements, and is also useful for browser automation testing as it allows your scripts to wait until javascript events have been hooked up in the UI before clicking on them. This library is fully compatible with Chrome/FireFox/Safari etc. as well as IE 8+.

**NOTE** This library works by hooking the addEventListener/removeEventListener attachEvent/detachEvent DOM prototypes and as such should only by used in debug builds as it may impact performance.

Usage
-----

```javascript
var elem = document.getElementById('some-element');

// Returns true if the element has at least one click listener
// In the case of listeners added using IE8 the style element.attachEvent('onclick')
// the 'on' prefix will be removed and it will still be recorded as a 'click' listener
var hasClickListener = elem.hasEventListener('click');

// Returns true if the element has at least one listener added for each of the listener types passed in via the array
hasClickListener = elem.hasEventListeners(['click']);

// Returns an array of all the event handler functions of the specified type currently attached to this element
// If no handlers are attached, an empty array will be returned.
var listeners = elem.getEventListeners('click');

elem.onAddEventListener('click',function(handler) {
  // Whenever a click event is added to this element, this function will be invoked.
  // The handler argument will be the function added via addEventListener/attachEvent
});

elem.onRemoveEventListener('click',function(handler) {
  // Whenever a click event is removed from this element, this function will be invoked.
  // the handler argument will be the function removed via removeEventListener/detachEvent
});

```


