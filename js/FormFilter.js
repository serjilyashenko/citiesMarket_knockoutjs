function FormFilter(eventDispatcher) {
    var self = this;
    this.eventDispatcher = eventDispatcher;

    this.populationMin = ko.observable(100);
    this.populationMax = ko.observable(25000000);
    this.yearMin = ko.observable(0);
    this.yearMax = ko.observable(2016);

    eventDispatcher.subscribe('state:meta:change', function (data) {
        self.setData(data);
    });
}

FormFilter.prototype.getData = function () {
    var data = {
        populationMin: this.populationMin(),
        populationMax: this.populationMax(),
        yearMin: this.yearMin(),
        yearMax: this.yearMax()
    };
    
    return data;
};

FormFilter.prototype.setData = function (data) {
    this.populationMin(data.populationMin);
    this.populationMax(data.populationMax);
    this.yearMin(data.yearMin);
    this.yearMax(data.yearMax);    
};

FormFilter.prototype.submit = function () {
    this.eventDispatcher.trigger('form-filter:change', this.getData());
};
