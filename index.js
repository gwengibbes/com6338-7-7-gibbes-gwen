//A variable named questionsArr that contains all the quiz data//
//questionsArr variable should contain at least FIVE question objects.//
var questionsArr = [
    {
        question: 'What country has the most islands?',
        answer: 'Sweden',
        options: [
            'Sweden',
            'Maldives',
            'The Caribbean',
            'Japan',
        ]
    },
    {
        question: 'What are Pink Ladies?',
        answer: 'Apples',
        options: [
            'Oranges',
            'Apples',
            'Strawberries',
            'Lemons',
        ]
    },
    {
        question: 'Where would you be standing if you were standing on the Spanish steps?',
        answer: 'Rome',
        options: [
            'Rome',
            'Seville',
            'San Juan',
            'Paris',
        ]
    },
    {
        question: 'What is a group of crows called?',
        answer: 'A murder of crows',
        options: [
            'A flock of crows',
            'A flight of crows',
            'An asylum of crows',
            'A murder of crows',
        ]
    },
    {
        question: 'What movie does Scuttle star in?',
        answer: 'The Little Mermaid',
        options: [
            'Snow White',
            'Cinderella',
            'The Little Mermaid',
            'Mulan',
        ]
    }
];
var selectedAnswers = [];
var timerId;

var quizBodyEl = document.getElementById("quiz");

function start() {
    //Get portion of the page where the quiz is supposed to be created//
    var previousScoreEl = document.createElement('p');
    quizBodyEl.appendChild(previousScoreEl);

    //Add start quiz button on screen//
    var startQuizEl = document.createElement('button');
    startQuizEl.setAttribute('id', 'start-quiz');
    startQuizEl.innerHTML = 'Start Quiz!';
    quizBodyEl.appendChild(startQuizEl);

    //After starting the quiz, your program should select the first question in questionsArr//
    var questionIndex = 0;
    var questionEl = document.createElement('p');
    quizBodyEl.appendChild(questionEl);
    //Creating the element where the options will be displayed//
    var answersEl = document.createElement('div');
    quizBodyEl.appendChild(answersEl);

    //Getting the previous score from local storage and putting it on the screen//
    function showPreviousScore() {
        var previousScore = localStorage.getItem('previous-score');
        if (previousScore) {
            previousScoreEl.innerHTML = 'Previous Score: ' + previousScore + '%';
        }
    }
    showPreviousScore();

    //Creating the function for the game to come to an end//
    var gameEnded = function () {
        questionEl.innerHTML = '';
        answersEl.innerHTML = '';
        //Calculating the score//
        var correctAnswers = 0;
        for (var i = 0; i < selectedAnswers.length; i++) {
            if (selectedAnswers[i] == questionsArr[i].answer) {
                correctAnswers += 1;
            }
        }
        //Rounding the score to a whole number and storing it in local storage//
        var score = Math.round((correctAnswers / questionsArr.length) * 100);
        localStorage.setItem('previous-score', score);
        quizBodyEl.innerHTML = '';
        showPreviousScore();
        //Restarts the quiz//
        start();
    }

    //Function to reset the timer//
    var resetTimer = function () {
        clearInterval(timerId)
        counter = 30;
        countDownEl.innerHTML = counter;
        //Count down from 30 one second at a time//
        timerId = setInterval(function () {
            counter = counter - 1;
            countDownEl.innerHTML = counter;
            if (counter == 0) {
                clearInterval(timerId);
                //Ends the game once the timer runs out//
                gameEnded();
            }
        }, 1000)
    }
    //Shows the current question that the user is on//
    var showActiveQuestion = function () {
        questionEl.innerHTML = questionsArr[questionIndex].question;
        answersEl.innerHTML = '';
        questionsArr[questionIndex].options.forEach(function (option) {
            var optionEl = document.createElement('button');
            optionEl.innerHTML = option;
            answersEl.appendChild(optionEl);
            //should show the next question and reset the timer when an option is chosen//
            optionEl.addEventListener('click', function (e) {
                //to store answer that users select//
                selectedAnswers.push(e.target.innerHTML);
                console.log(selectedAnswers);
                questionIndex = questionIndex + 1;
                showActiveQuestion();
                resetTimer();
            })
        })
    }
    //Start button for quiz//
    startQuizEl.addEventListener('click', function () {
        if (questionIndex == questionsArr.length - 1) {
            gameEnded();
            clearInterval(timerId);
        }
        //Makes the button function//
        showActiveQuestion();
        resetTimer();
        startQuizEl.remove();
    })
    //Adding the count down element on screen//
    var countDownEl = document.createElement('p');
    countDownEl.innerHTML = '30';
    quizBodyEl.appendChild(countDownEl);
}
//Starts the quiz//
start();