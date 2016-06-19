function State(eventDispatcher) {
    var self = this;

    this.MAX_ELEMENTS_ON_PAGE = 10;
    this.list = [];
    this.filteredList = [];
    this.pageList = [];

    this.state = {
        page: 1,
        meta: {},
        searchMethod: "все"
    };

    this.eventDispatcher = eventDispatcher;

    this.eventDispatcher.subscribe('form-filter:change', function (meta) {
        self.state.meta = meta;
        self.updateList();
    });
    
    this.eventDispatcher.subscribe('pagination:change', function (page) {
        self.state.page = page;
        self.setPageList();
    });
    
    this.eventDispatcher.subscribe('menu-filter:change', function (searchMethod) {
        self.state.searchMethod = searchMethod;
        self.state.page = 1;
        self.setFilteredList();
    });
}

State.prototype.init = function () {
    this.updateList();
};

State.prototype.setFilteredList = function () {
    var self = this;

    if (this.state.searchMethod === "все") {
        this.filteredList = this.list;
    } else {
        this.filteredList = this.list.filter(function (item) {
            return (item.continent === self.state.searchMethod);
        });
    }
    this.eventDispatcher.trigger('state:filtered-list:change', this.filteredList);
    self.setPageList();
};

State.prototype.setPageList = function () {
    var firstNum = (this.state.page - 1) * this.MAX_ELEMENTS_ON_PAGE;

    this.pageList = this.filteredList.slice(firstNum, firstNum + this.MAX_ELEMENTS_ON_PAGE);
    this.eventDispatcher.trigger('state:page-list:change', this.pageList);
};

State.prototype.updateList = function () {
    var self = this,
        meta = this.state.meta;

    $.post('./backend/refreshData.php', meta, function (response) {
        self.list = response.items;
        self.eventDispatcher.trigger('state:list:change', self.list);
        self.state.meta = response.meta;
        self.eventDispatcher.trigger('state:meta:change', self.state.meta);
        self.setFilteredList();
    }, 'json');
};
