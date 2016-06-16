function FormFilter(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    
    this.populationMin = ko.observable(100);
    this.populationMax = ko.observable(25000000);
    this.yearMin = ko.observable(0);
    this.yearMax = ko.observable(2016);
}

FormFilter.prototype.submitForm = function () {
    eventDispatcher.trigger('formFilter: submit', this);
};