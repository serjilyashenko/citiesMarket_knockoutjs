function MenuFilter(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    
    this.items = ko.observableArray([
        {
            title: "все",
            searchMethod: "все"
        },
        {
            title: "евразия",
            searchMethod: "евразия"
        },
        {
            title: "северная америка",
            searchMethod: "северная америка"
        },
        {
            title: "южная америка",
            searchMethod: "южная америка"
        },
        {
            title: "африка",
            searchMethod: "африка"
        },
        {
            title: "авcтралия",
            searchMethod: "авcтралия"
        },
        {
            title: "антарктида",
            searchMethod: "антарктида"
        }
    ]);
    this.activeSearchMethod = ko.observable('все');
}

MenuFilter.prototype.changeSearchMethod = function (searchMethod) {
    this.activeSearchMethod(searchMethod);
    this.eventDispatcher.trigger('menu-filter:change', searchMethod);
};
