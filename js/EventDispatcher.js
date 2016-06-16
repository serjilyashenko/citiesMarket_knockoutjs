function EventDispatcher() {
    this.subscriptors = {};
}

EventDispatcher.prototype.subscribe = function (event, callback) {
    var subscriptors = this.subscriptors;
    if (!subscriptors[event]) {
        subscriptors[event] = [];
    }
    subscriptors[event].push(callback);
};

EventDispatcher.prototype.trigger = function (event) {
    console.log('triggered event ' + event);
    var args = Array.prototype.slice.call(arguments, 1);
    var subscriptors = this.subscriptors;
    if (subscriptors[event]) {
        subscriptors[event].forEach(function (callback) {
            if (callback) {
                callback.apply(null, args);
            }
        });
    }
}
