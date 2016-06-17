function CitiesList(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;
    
    this.items = ko.observableArray([]);
    
    this.eventDispatcher.subscribe('state:paginationFiltered', function (items) {
        self.setItems(items);
    });
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
};
