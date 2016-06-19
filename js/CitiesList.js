function CitiesList(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;
    
    this.items = ko.observableArray([]);
    
    this.eventDispatcher.subscribe('state:page-list:change', function (pageList) {
        self.setItems(pageList);
    });
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
};
