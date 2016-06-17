function State(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    var MAX_ELEMENTS_ON_PAGE = 10;

    var fullList = [];
    var menuFilteredList = [];

    this.eventDispatcher.subscribe('formFilter:submit', function (formFilter) {
        var data = {
            "populationMin": formFilter.populationMin(),
            "populationMax": formFilter.populationMax(),
            "yearMin": formFilter.yearMin(),
            "yearMax": formFilter.yearMax()
        };
        $.post('./backend/refreshData.php', data, function (response) {
            fullList = response.items;
            self.eventDispatcher.trigger('state:dataGot', response);
        }, 'json');
    });

    this.eventDispatcher.subscribe('menuFilter:change', function (searchMethod) {
        menuActiveItem = searchMethod;
        if (searchMethod === "все") {
            menuFilteredList = fullList;
        } else {
            menuFilteredList = fullList.filter(function (item) {
                return (item.continent === searchMethod);
            });
        }
        self.eventDispatcher.trigger('state:menuFiltered', menuFilteredList, MAX_ELEMENTS_ON_PAGE);
    });

    this.eventDispatcher.subscribe('pagination:change', function (activeItem) {
        var firstNum = (activeItem - 1) * MAX_ELEMENTS_ON_PAGE;
        var list = menuFilteredList.slice(firstNum, firstNum + MAX_ELEMENTS_ON_PAGE);
        self.eventDispatcher.trigger('state:paginationFiltered', list);
    });
}

State.prototype.start = function (formFilter) {
    this.eventDispatcher.trigger('formFilter:submit', formFilter);
};