requirejs.config({
    baseUrl: "lib",
    paths: {
        activity: "../js",
        jquery: "../js/jquery",
        words: "../js/word_list",
        spritely: "../js/spritely",
    }
});

requirejs(["activity/activity"]);
