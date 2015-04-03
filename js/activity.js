define(function (require) {
    var activity = require("sugar-web/activity/activity");

    require(['domReady!'], function (doc) {
        activity.setup();

    });

});
