(function() {
	var listeners = {};

	function getListener(element,name)
	{
		if ( !listeners[element] ) {
			listeners[element] = {
			};
		}
		if ( !listeners[element][name] ) {
			listeners[element][name] = {
				listeners: [],
				addCallbacks: [],
				removeCallbacks: []
			}
		}
		return listeners[element][name];
	}

	if ( document.addEventListener ) {
		var addEventListener = Element.prototype.addEventListener;
		Element.prototype.addEventListener = function() {
			var listener = getListener(this,arguments[0]);
			listener.listeners.push(arguments[1]);
			var result = addEventListener.apply(this,Array.prototype.slice.call(arguments));
			for (var i = 0;i < listener.addCallbacks.length; ++i ) {
				listener.addCallbacks[i].call(this,arguments[1]);
			}
			return result;
		};
	
		var removeEventListener = Element.prototype.removeEventListener;
		Element.prototype.removeEventListener = function() {
			var listener = getListener(this,arguments[0]);
			for ( var i = listener.listeners.length - 1;i>=0; --i) {
				if (listener.listeners[i]===arguments[1]) {
					listener.listeners.splice(i,1);
				}
			}
	
			var result = removeEventListener.apply(this,Array.prototype.slice.call(arguments));
			for (var i = 0;i < listener.removeCallbacks.length; ++i ) {
				listener.removeCallbacks[i].call(this,arguments[1]);
			}
			return result;
		};
	}

	if ( document.attachEvent ) {
		var attachEvent = Element.prototype.attachEvent;
		Element.prototype.attachEvent = function()
		{
			var name = arguments[0].substring(2);
			var listener = getListener(this,name);
			listener.listeners.push(arguments[1]);
			var result = attachEvent.apply(this,Array.prototype.slice.call(arguments));
			for (var i = 0;i < listener.addCallbacks.length; ++i ) {
				listener.addCallbacks[i].call(this,arguments[1]);
			}
			return result;
		};
		
		var detachEvent = Element.prototype.detachEvent;
		Element.prototype.detachEvent = function() {
			var name = arguments[0].substring(2);
			var listener = getListener(this,name);
			for ( var i = listener.listeners.length - 1;i>=0; --i) {
				if ( listener.listeners[1] === arguments[1]) {
					listener.listeners.splice(i,1);
				}
			}

			var result = detachEvent.apply(this,Array.prototype.slice.call(arguments));
			for (var i = 0;i < listener.removeCallbacks.length; ++i ) {
				listener.removeCallbacks[i].call(this,arguments[1]);
			}
			return result;
		};
	}

	Element.prototype.hasEventListener = function(name) {
		return getListener(this,name).listeners.length > 0;
	};

	Element.prototype.hasEventListeners = function(names) {
		for (var i = 0; i < names.length; ++i) {
			if (getListener(this,names[i]).listeners.length === 0) return false;
		}
		return true;
	};

	Element.prototype.getEventListeners = function(name) {
		return getListener(this,name).listeners;
	};

	Element.prototype.onAddEventListener = function(name,callback) {
		getListener(this,name).addCallbacks.push(callback);
	};

	Element.prototype.onRemoveEventListener = function(name,callback) {
		getListener(this,name).removeCallbacks.push(callback);
	};
})();
