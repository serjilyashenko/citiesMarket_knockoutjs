function Pagination(eventDispatcher, maxElementsOnPage) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.MAX_ELEMENTS_ON_PAGE = maxElementsOnPage || 10;
    this.activeItem = ko.observable(1);
    this.items = ko.observableArray([1]);
    this.width = ko.computed(function () {
        return (self.items().length * 30 + 'px');
    }, this);

    // TODO: check structure of that code
    this.selectItemCall = function (activeItem, event) {
        self.selectItem(activeItem, event);
    };

    this.eventDispatcher.subscribe('server: dataGot', function (data) {
        self.selectItem(1);
        self.showItems(data.items.length);  // TODO: subscribe on other event (after filtrations of tabs)
    });
}

Pagination.prototype.shiftPagContainer = function (shift) {
    console.log('!', this);
    var lastItem = $(".pagecontainer div").last();
    var contWrap = $(".pagecontainer_wrap");
    var container = $(".pagecontainer");

    container.css('left', '+=' + shift + "px");
    if (container.offset().left + shift > contWrap.offset().left)
        container.css('left', 0 + "px");
    if (lastItem.offset().left + lastItem.width() + shift < contWrap.offset().left + contWrap.width()) {
        var coordinate = container.offset().left - lastItem.offset().left - lastItem.width() - 10 + contWrap.width();
        container.css('left', coordinate + "px");
    }
};

Pagination.prototype.showItems = function (elementsCount) {
    var res = [];
    var paginationLength = elementsCount / this.MAX_ELEMENTS_ON_PAGE;
    if (elementsCount % this.MAX_ELEMENTS_ON_PAGE) {
        paginationLength++;
    }

    res.push(1);
    for (var i = 2; i <= paginationLength; i++) {
        res.push(i);
    }

    this.items(res);
    return res;
};

// TODO: check structure of that code
Pagination.prototype.selectItem = function (activeItem, event) {
    console.log(this);
    this.activeItem(activeItem);
    this.eventDispatcher.trigger('pagination: change', activeItem);

    var targetPosition = $(".pagecontainer_wrap").offset().left + $(".pagecontainer_wrap").width() / 2;
    var activeItemElement = $($(".pagecontainer div")[activeItem - 1]);
    var shift = targetPosition - activeItemElement.offset().left;    // end of shift calculation

    this.shiftPagContainer(shift);
};
