function CitiesList() {
    this.items = ko.observableArray([]);
}

CitiesList.prototype.setItems = function (items) {
    this.items(items);
};
