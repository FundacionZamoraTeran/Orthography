define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var palette = require("sugar-web/graphics/palette");
    var icon = require("sugar-web/graphics/icon");
    var l10n = require("webL10n");

    require(['domReady!'], function (doc) {
        activity.setup();
        var description_game = document.getElementById('description-game');
        description_game.style.left = String((window.innerWidth / 2) - (description_game.offsetWidth / 2)) + "px";
        description_game.style.top = String((window.innerHeight / 2) - (description_game.offsetHeight)) + "px";

        var optionButton = document.getElementById("option-button");
        var optionPallete = new palette.Palette(optionButton, "Opciones");
        var selects = document.createElement("div");
        selects.className = "select-div";
        selects.innerHTML +=
            '<p>Dificultad</p>' +
            '<select name="level">' +
                '<option value="">Seleccionar (fácil)</option>' +
                '<option value="">Escribir (difícil)</option>' +
            '</select>' +
            '<p>Regla</p>' +
            '<select name="rule">' +
                '<option value="">Todas las reglas (aleatoria)</option>' +
                '<option value="">b-v</option>' +
                '<option value="">c-s</option>' +
                '<option value="">h</option>' +
                '<option value="">s-z</option>' +
                '<option value="">m-n</option>' +
                '<option value="">g-j</option>' +
                '<option value="">ll-y</option>' +
                '<option value="">k-c-q</option>' +
            '</select>';
        optionPallete.setContent([selects]);

    });

});
