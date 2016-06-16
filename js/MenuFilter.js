function MenuFilter(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    this.activeItem = ko.observable('все');
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
}

MenuFilter.prototype.onClick = function (item) {
    this.activeItem(item.searchMethod);
};
