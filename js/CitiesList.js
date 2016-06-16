function CitiesList(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.items = ko.observableArray([]);

    // TODO: subscribe on other event (after filtrations)
    this.eventDispatcher.subscribe('server: dataGot', function (data) {
        self.setItems(data.items);
    });
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
    console.log(this.items());
};
