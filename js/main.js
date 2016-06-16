(function () {

    var eventDispatcher = new EventDispatcher();

    var citiesList = new CitiesList(function (event) {  // TODO: remove test
        eventDispatcher.trigger(event);
    });
    ko.applyBindings(citiesList, document.getElementById('cities-list'));

    var formFilter = new FormFilter(eventDispatcher);
    ko.applyBindings(formFilter, document.getElementById('form-filter'));

    eventDispatcher.subscribe('formFilter: submit', function (formFilter) {
        var data = {
            "populationMin": formFilter.populationMin(),
            "populationMax": formFilter.populationMax(),
            "yearMin": formFilter.yearMin(),
            "yearMax": formFilter.yearMax()
        };
        $.post('./backend/refreshData.php', data, function (response) {
            console.dir(response);
        }, 'json');
    });

    // TODO: remove
    window.eventDispatcher = eventDispatcher;
}());
