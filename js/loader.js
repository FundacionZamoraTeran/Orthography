requirejs.config({
    baseUrl: "lib",
    paths: {
        activity: "../js",
        words: "../js/word_list"
    }
});

requirejs(["activity/activity"]);
