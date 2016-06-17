function MenuFilter(eventDispatcher) {
    var self = this;
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

    this.eventDispatcher.subscribe('state:dataGot', function () {
        self.onClick({searchMethod: self.activeItem()});
    });
}

MenuFilter.prototype.onClick = function (item) {
    var searchMethod = item.searchMethod;
    this.activeItem(searchMethod);
    this.eventDispatcher.trigger('menuFilter:change', searchMethod);
};
