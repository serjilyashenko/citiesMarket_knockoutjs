(function () {

    var eventDispatcher = new EventDispatcher();

    var citiesList = new CitiesList();
    ko.applyBindings(citiesList, document.getElementById('cities-list'));


    // TODO: remove
    window.eventDispatcher = eventDispatcher;

    eventDispatcher.subscribe('change1', function (param) {
        console.log('callback1 of change1 with param = ', param);
    });
    eventDispatcher.subscribe('change2', function (amount, currency) {
        console.log('callback1 of change2 with param = ', amount, currency);
    });

    eventDispatcher.trigger('change1', 'paramA');
    eventDispatcher.trigger('change2', 'paramB');

    eventDispatcher.subscribe('change1', function (param) {
        console.log('callback2 of change1 with param = ', param);
    });

    eventDispatcher.trigger('change1', "paramC");
    eventDispatcher.trigger('change2', 100000, 'usd');
}());
