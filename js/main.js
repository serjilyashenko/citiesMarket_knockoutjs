(function () {

    var eventDispatcher = new EventDispatcher();
    var citiesList = new CitiesList(eventDispatcher);
    ko.applyBindings(citiesList, document.getElementById('cities-list'));
    var formFilter = new FormFilter(eventDispatcher);
    ko.applyBindings(formFilter, document.getElementById('form-filter'));
    var pagination = new Pagination(eventDispatcher);
    ko.applyBindings(pagination, document.getElementById('pagination'));
    var menuFilter = new MenuFilter(eventDispatcher);
    ko.applyBindings(menuFilter, document.getElementById('menu-filter'));

    var state = new State(eventDispatcher);
    // TODO: check that architecture
    state.start(formFilter);

    // TODO: remove
    // window.eventDispatcher = eventDispatcher;
}());

