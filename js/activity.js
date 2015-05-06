define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var palette = require("sugar-web/graphics/palette");
    var icon = require("sugar-web/graphics/icon");
    var l10n = require("webL10n");


    var boxGame = document.getElementById('box-game');
    var op1 = document.getElementById('op1');
    var op2 = document.getElementById('op2');
    var sentence = document.getElementById('sentence');
    boxGame.style.left = String((window.innerWidth / 2) - (boxGame.offsetWidth / 2)) + "px";
    boxGame.style.top = String((window.innerHeight / 3) - (boxGame.offsetHeight)) + "px";
    var contador = 0;

    var listWords = [
        {
            'sentence': 'La ___ es bonita',
            'op1': 'caza',
            'op2': 'casa',
            'op1_concepto': 'Verbo',
            'op2_concepto': 'Sustantivo',
            'answer': 'casa',
        },
        {
            'sentence': 'Ya le puse el ______ a la caña de pescar.',
            'op1': 'cebo',
            'op2': 'sebo',
            'op1_concepto': 'Comida o cosas que simulan serlo',
            'op2_concepto': 'Grasa sólida y dura que se extrae de algunos animales',
            'answer': 'cebo',
        },
    ];

    function randomSentence() {
        return listWords[Math.floor(Math.random() * (listWords.length))];
    }

    function checkWord(option, answer) {
        // console.log(option.innerHTML);
        // console.log(answer.answer);
        // console.log('===========================================');
        if (option.innerHTML === answer.answer) {
            setGame();
        }

        else {
            sentence.innerHTML = "Muy mal";
        }

    }

    function setGame() {
        contador += 1;
        var word = randomSentence();
        console.log('*************');
        console.log(contador);
        console.log(word.sentence);
        console.log(word.op1);
        console.log(word.op2);
        console.log('*************');
        sentence.innerHTML = word.sentence;
        op1.innerHTML = word.op1;
        op2.innerHTML = word.op2;
        op1.addEventListener('click', function() { checkWord(this, word); })
        op2.addEventListener('click', function() { checkWord(this, word); })
    }

    require(['domReady!'], function (doc) {
        activity.setup();
        word = setGame();

        // Barra superior
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
