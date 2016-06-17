function FormFilter(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.populationMin = ko.observable(100);
    this.populationMax = ko.observable(25000000);
    this.yearMin = ko.observable(0);
    this.yearMax = ko.observable(2016);

    eventDispatcher.subscribe('server:dataGot', function (data) {
        self.populationMin(data.meta.populationMin);
        self.populationMax(data.meta.populationMax);
        self.yearMin(data.meta.yearMin);
        self.yearMax(data.meta.yearMax);
    });
}

FormFilter.prototype.submitForm = function () {
    this.eventDispatcher.trigger('formFilter:submit', this);
};
