define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var palette = require("sugar-web/graphics/palette");
    var icon = require("sugar-web/graphics/icon");
    var l10n = require("webL10n");

   /*
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
        rand = Math.floor(Math.random() * (listWords.length));
        console.log("Random!!!!!!!!!!!!!!!!");
        console.log(rand)
        return listWords[rand];
    }

    function checkWord(option, answer) {
        console.log('===========================================');
        console.log(option.innerHTML);
        console.log(answer.answer);
        console.log('===========================================');
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
    }*/


    var words = null;

    function getWords(level) {
        if (words == null) {
            words = require("words");
        }
        return words[level][Math.floor(Math.random() * (words[level].length))];
    }

    function Game() {
        this.level = '';
        this.currentWord = [];
        this.answer = '';

        this.start = function() {
            this.currentWord = getWords(this.level);
            this.answer = this.currentWord['answer'];
            sentence.innerHTML = this.currentWord['sentence'];

            if (sentence.className == 'main-sentence') {
                sentence.className = '';
            }

            if (this.level == 'level_1') {
                document.getElementById('op1').innerHTML = this.currentWord['op1'];
                document.getElementById('op2').innerHTML = this.currentWord['op2'];
            }
        }

        this.showError = function() {
            var topBox = document.getElementById('top-box');
            var answerBox = document.getElementById('answer-box');

            topBox.innerHTML =
            '<h1>¡Has fallado...!</h1>'+
            '<a href="#" class="restart">Vuelve a intentarlo»</a>';

            answerBox.innerHTML =
                '<h2 class="error-title">Aprende la diferencia</h2>' +
                '<div class="col-1-2" id="col-left">' +
                '<p class="definition-word">' + this.currentWord['op1'] + '</p>' +
                '<p class="definition">' + this.currentWord['op1_concept'] + '</p>' +
                '</div>' +
                '<div class="col-1-2" id="col-right">' +
                '<p class="definition-word">' + this.currentWord['op2'] + '</p>' +
                '<p class="definition">' + this.currentWord['op2_concept'] + '</p>' +
                '</div>';

        }

        this.checkAnswer = function(answer) {
            if (answer == this.answer) {
                this.start();
            }
            else {
                this.showError();
            }
        }
    }

    require(['domReady!'], function (doc) {
        activity.setup();
        var boxGame = document.getElementById('box-game');
        boxGame.style.left = String((window.innerWidth / 2) - (boxGame.offsetWidth / 2)) + "px";
        boxGame.style.top = String((window.innerHeight / 2) - (boxGame.offsetHeight)) + "px";
        var sentence = document.getElementById('sentence');
        var answerBox = document.getElementById('answer-box');
        var levelOne = document.getElementById('level-one');
        var levelTwo = document.getElementById('level-two');

        game = new Game();

        levelOne.addEventListener('click', function() {
            game.level = 'level_1';
            answerBox.innerHTML =
                '<h2 class="option-title">Selecciona la palabra correcta</h2>' +
                '<div class="col-1-2" id="col-left">' +
                '<button id="op1"></button>' +
                '</div>' +
                '<div class="col-1-2" id="col-right">' +
                '<button id="op2"></button>' +
                '</div>';
            game.start();
            var op1 = document.getElementById('op1');
            var op2 = document.getElementById('op2');
            op1.addEventListener('click', function() {
                game.checkAnswer(this.innerHTML);
            });
            op2.addEventListener('click', function() {
                game.checkAnswer(this.innerHTML);
            });

        });

        levelTwo.addEventListener('click', function(){
            game.level = 'level_2';
            answerBox.innerHTML =
            '<h2 class="option-title">Escribe la palabra que falta</h2>' +
            '<input type="text" id="answer">';
            game.start();
            var answerInput = document.getElementById('answer');
            answerInput.addEventListener('change', function() {
                game.checkAnswer(this.value);
                this.value = '';
            });

        });
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
