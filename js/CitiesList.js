function CitiesList(mediator) {
    this.items = ko.observableArray([]);
    this.mediator = mediator;
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
};
