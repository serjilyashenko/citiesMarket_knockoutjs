(function () {

    var eventDispatcher = new EventDispatcher(),
        citiesList = new CitiesList(eventDispatcher),
        formFilter = new FormFilter(eventDispatcher),
        pagination = new Pagination(eventDispatcher),
        menuFilter = new MenuFilter(eventDispatcher),
        state = new State(eventDispatcher);
    
    // TODO: check that architecture
    state.init();

    ko.applyBindings(citiesList, document.getElementById('cities-list'));
    ko.applyBindings(formFilter, document.getElementById('form-filter'));
    ko.applyBindings(pagination, document.getElementById('paginator'));
    ko.applyBindings(menuFilter, document.getElementById('menu-filter'));

    // TODO: remove
    window.state = state;
    
}());
