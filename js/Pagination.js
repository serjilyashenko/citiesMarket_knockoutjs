function Pagination(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.MAX_ELEMENTS_ON_PAGE;
    
    this.activeItem = ko.observable(1);
    this.items = ko.observableArray([1]);
    this.width = ko.computed(function () {
        return (self.items().length * 30 + 'px');
    }, this);

    this.eventDispatcher.subscribe('state:menuFiltered', function (list, maxElementsOnList) {
        console.log(maxElementsOnList)
        self.MAX_ELEMENTS_ON_PAGE = maxElementsOnList || 10;
        self.showItems(list.length);
        self.selectItem(1);
    });
}

Pagination.prototype.shiftPagContainer = function (shift) {
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

Pagination.prototype.selectItem = function (activeItem, event) {
    this.activeItem(activeItem);
    this.eventDispatcher.trigger('pagination:change', activeItem);

    var targetPosition = $(".pagecontainer_wrap").offset().left + $(".pagecontainer_wrap").width() / 2;
    var activeItemElement = $($(".pagecontainer div")[activeItem - 1]);
    var shift = targetPosition - activeItemElement.offset().left;    // end of shift calculation

    this.shiftPagContainer(shift);
};
