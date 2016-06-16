(function () {

    var eventDispatcher = new EventDispatcher();

    var citiesList = new CitiesList(function (event) {  // TODO: remove test
        eventDispatcher.trigger(event);
    });
    ko.applyBindings(citiesList, document.getElementById('cities-list'));

    var formFilter = new FormFilter(eventDispatcher);
    ko.applyBindings(formFilter, document.getElementById('form-filter'));

    eventDispatcher.subscribe('formFilter: submit', null);

    // TODO: remove
    window.eventDispatcher = eventDispatcher;
}());
