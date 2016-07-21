function Pagination(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.MAX_ELEMENTS_ON_PAGE = 10;

    this.activeItem = ko.observable(1);
    this.items = ko.observableArray([1]);
    this.width = ko.computed(function () {
        return (self.items().length * 30 + 'px');
    }, this);

    this.eventDispatcher.subscribe('state:filtered-list:change', function (filteredList) {
        self.setItems(filteredList.length);
        self.setActiveItem(1);
    });
}

Pagination.prototype.shiftPagContainer = function (shift) {
    var lastItem = $(".paginator__list div").last(),
        contWrap = $(".paginator__content"),
        container = $(".paginator__list");

    container.css('left', '+=' + shift + "px");
    if (container.offset().left + shift > contWrap.offset().left)
        container.css('left', 0 + "px");
    if (lastItem.offset().left + lastItem.width() + shift < contWrap.offset().left + contWrap.width()) {
        var coordinate = container.offset().left - lastItem.offset().left - lastItem.width() - 10 + contWrap.width();
        container.css('left', coordinate + "px");
    }
};

Pagination.prototype.setItems = function (elementsCount) {
    var i,
        res = [],
        paginationLength = elementsCount / this.MAX_ELEMENTS_ON_PAGE;

    if (elementsCount % this.MAX_ELEMENTS_ON_PAGE) {
        paginationLength++;
    }

    res.push(1);
    for (i = 2; i <= paginationLength; i += 1) {
        res.push(i);
    }

    this.items(res);
    return res;
};

Pagination.prototype.setActiveItem = function (activeItem) {
    var targetPosition = $(".paginator__content").offset().left + $(".paginator__content").width() / 2,
        activeItemElement = $($(".paginator__list div")[activeItem - 1]),
        shift = targetPosition - activeItemElement.offset().left;

    this.activeItem(activeItem);
    this.shiftPagContainer(shift);
};

Pagination.prototype.selectItem = function (activeItem) {
    this.setActiveItem(activeItem);
    this.eventDispatcher.trigger('pagination:change', activeItem);
};
