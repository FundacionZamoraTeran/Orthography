define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var palette = require("sugar-web/graphics/palette");
    var icon = require("sugar-web/graphics/icon");
    var l10n = require("webL10n");

    var words = null;

    function getWords(level) {
        if (words == null) {
            words = require("words");
        }
        return words[level][Math.floor(Math.random() * (words[level].length))];
    }

    function Game() {
        this.level = null;
        this.mode = null;
        this.currentWord = [];
        this.answer = '';
        this.boxGame = null;
        this.sentence = null;
        this.answerBox = null;
        this.error_count = 0;
        this.point_count = 0;
        this.win_level =  0;
        this.character = 0;

        this.init = function(level, mode) {
            this.level = level;
            this.mode = mode;
            this.point_count = 0;
            document.getElementById('point-bar').innerHTML = '';
            if (this.mode == '1') {
                this.win_level = 5;
            }
            else if (this.mode == '2') {
                this.win_level = 3;
            }
            document.getElementById('world-menu').classList.toggle('hidden');
            document.getElementById('box-game').classList.toggle('hidden');
            document.getElementById('point-bar').classList.toggle('hidden');
            if (this.character == 1) {
                document.getElementById('walking-character').className = 'boy-1';
            }
            else {
                document.getElementById('walking-character').className = 'girl-1';
            }
            this.interface();
        }

        this.start = function() {
            this.currentWord = getWords(this.level);
            this.answer = this.currentWord['answer'];
            sentence.innerHTML = this.currentWord['sentence'];

            if (sentence.className == 'main-sentence') {
                sentence.className = '';
            }

            if (this.mode == '1') {
                document.getElementById('op1').innerHTML = this.currentWord['op1'];
                document.getElementById('op2').innerHTML = this.currentWord['op2'];
            }
        }

        this.interface = function() {
            document.getElementById('top-box').innerHTML = '<h1 id="sentence" class="main-sentence"></h1>';
            boxGame = document.getElementById('box-game');
            // boxGame.style.left = String((window.innerWidth / 2) - (boxGame.offsetWidth / 2)) + "px";
            // boxGame.style.top = String((window.innerHeight / 3) - (boxGame.offsetHeight)) + "px";
            sentence = document.getElementById('sentence');
            answerBox = document.getElementById('answer-box');
            if (this.mode == '1') {
                answerBox.innerHTML =
                    '<h2 class="option-title">Selecciona la palabra correcta</h2>' +
                    '<div class="col-1-2" id="col-left">' +
                    '  <button id="op1"></button>' +
                    '</div>' +
                    '<div class="col-1-2" id="col-right">' +
                    '  <button id="op2"></button>' +
                    '</div>';
                var op1 = document.getElementById('op1');
                var op2 = document.getElementById('op2');
                op1.addEventListener('click', function() {
                    game.checkAnswer(this.innerHTML);
                });
                op2.addEventListener('click', function() {
                    game.checkAnswer(this.innerHTML);
                });
            }

            else if (this.mode == '2') {
                answerBox.innerHTML =
                    '<h2 class="option-title">Escribe la letra que falta</h2>' +
                    '<input type="text" id="answer">';
                var answerInput = document.getElementById('answer');
                answerInput.addEventListener('change', function() {
                    game.checkAnswer(this.value);
                    this.value = '';
                });
            }
            this.start();
        }

        this.showError = function() {
            var topBox = document.getElementById('top-box');
            var answerBox = document.getElementById('answer-box');

            topBox.innerHTML =
            '<h1>¡Has fallado...!</h1>'+
            '<a href="#" id="restart">Vuelve a intentarlo»</a>';

            document.getElementById('restart').addEventListener('click', this.interface.bind(this), false);

            if (this.mode == '1') {
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
            else if (this.mode == '2') {
                answerBox.innerHTML =
                '<h2 class="error-title">Aprende la regla</h2>' +
                '<p class="rule">' + this.currentWord['concept'] + '</p>';

            }

        }

        this.setBar = function() {
            var bar = document.getElementById('point-bar');
            bar.innerHTML = '';
            for (var i = this.point_count; i > 0; i--) {
                bar.innerHTML += '<span class="star"></span>';
            }
        }

        this.checkAnswer = function(answer) {
            if (answer.toLowerCase() == this.answer.toLowerCase()) {
                this.error_count = 0;
                this.point_count += 1;
                if (this.point_count < this.win_level) {
                    this.setBar();
                    this.start();
                }
                else {
                    var topBox = document.getElementById('top-box');
                    var answerBox = document.getElementById('answer-box');
                    topBox.innerHTML =
                    '<h1>¡Felicidades, has completado este mundo!</h1>';
                    answerBox.innerHTML =
                    '<p><strong>Has ganado una medalla</strong></p>' +
                    '<p><span class="medal"></span></p>' +
                    '<p><button id="next">Continuar</button></p>';

                    document.getElementById('next').addEventListener('click', function() {
                        document.getElementById('world-menu').classList.toggle('hidden');
                        document.getElementById('box-game').classList.toggle('hidden');
                        document.getElementById('point-bar').classList.toggle('hidden');
                        document.getElementById('walking-character').className = 'hidden';
                    })

                }
            }
            else {
                this.error_count += 1;
                if (this.point_count > 0) {
                    this.point_count = this.point_count - 1;
                    this.setBar();

                }

                if (this.error_count >= 5) {
                    this.error_count = 0;
                    document.getElementById('world-menu').classList.toggle('hidden');
                    document.getElementById('box-game').classList.toggle('hidden');
                    document.getElementById('point-bar').classList.toggle('hidden');
                }
                else {
                    this.showError();
                }
            }
        }
    }

    require(['domReady!'], function (doc) {
        activity.setup();

        game = new Game();

        document.getElementById('boy').addEventListener('click', function() {
            document.getElementById('character').classList.toggle('hidden');
            document.getElementById('world-menu').classList.toggle('hidden');
            game.character = 1;
        });
        document.getElementById('girl').addEventListener('click', function() {
            document.getElementById('character').classList.toggle('hidden');
            document.getElementById('world-menu').classList.toggle('hidden');
            game.character = 2;
        });

        document.getElementById('1').addEventListener('click', function() {
            game.init('1', '2');
        });
        document.getElementById('2').addEventListener('click', function() {
            game.init('2', '2');
        });
        document.getElementById('3').addEventListener('click', function() {
            game.init('3', '2');
        });
        document.getElementById('4').addEventListener('click', function() {
            game.init('4', '2');
        });
        document.getElementById('5').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('6').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('7').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('8').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('9').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('10').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('11').addEventListener('click', function() {
            // game.init('1', '1');
        });
        document.getElementById('12').addEventListener('click', function() {
            // game.init('1', '1');
        });
    });
});
