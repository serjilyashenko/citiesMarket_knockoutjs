function CitiesList(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;
    
    this.items = ko.observableArray([]);

    // TODO: subscribe on other event (after filtrations)
    this.eventDispatcher.subscribe('pagination: filtered', function (items) {
        self.setItems(items);
    });
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
};
