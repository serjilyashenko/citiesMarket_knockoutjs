(function () {
    var MAX_ELEMENTS_ON_PAGE = 10;

    var fullList = [];

    var eventDispatcher = new EventDispatcher();
    var citiesList = new CitiesList(eventDispatcher);
    ko.applyBindings(citiesList, document.getElementById('cities-list'));
    var formFilter = new FormFilter(eventDispatcher);
    ko.applyBindings(formFilter, document.getElementById('form-filter'));
    var pagination = new Pagination(eventDispatcher, MAX_ELEMENTS_ON_PAGE);
    ko.applyBindings(pagination, document.getElementById('pagination'));
    var menuFilter = new MenuFilter(eventDispatcher);
    ko.applyBindings(menuFilter, document.getElementById('menu-filter'));

    eventDispatcher.subscribe('formFilter:submit', function (formFilter) {
        var data = {
            "populationMin": formFilter.populationMin(),
            "populationMax": formFilter.populationMax(),
            "yearMin": formFilter.yearMin(),
            "yearMax": formFilter.yearMax()
        };
        $.post('./backend/refreshData.php', data, function (response) {
            fullList = response.items;
            eventDispatcher.trigger('server:dataGot', response);
        }, 'json');
    });
    eventDispatcher.subscribe('server:dataGot', function () {
    });
    eventDispatcher.subscribe('pagination:change', function (activeItem) {
        var firstNum = (activeItem - 1) * MAX_ELEMENTS_ON_PAGE;
        var list = fullList.slice(firstNum, firstNum + MAX_ELEMENTS_ON_PAGE);
        eventDispatcher.trigger('state:filtered', list);
    });

    eventDispatcher.trigger('formFilter:submit', formFilter);

    // TODO: remove
    // window.eventDispatcher = eventDispatcher;
}());

// TODO: move State module in State.js from main.js
