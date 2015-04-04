define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var icon = require("sugar-web/graphics/icon");
    var l10n = require("webL10n");

    require(['domReady!'], function (doc) {
        activity.setup();
        console.log("Hello World");
    });

});
