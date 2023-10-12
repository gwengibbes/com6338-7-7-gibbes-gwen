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

//Get portion of the page where the quiz is supposed to be created//
var quizBodyEl = document.getElementById("quiz");
var previousScoreEl = document.createElement('p');
quizBodyEl.appendChild(previousScoreEl);

//Should show first question text, choices, and remaining time of 10 when start is clicked//
//After starting the quiz, your program should select the first question in questionsArr and display the question as well as the possible choices//
var questionIndex = 0;
var questionEl = document.createElement('p');
quizBodyEl.appendChild(questionEl);
//Makes the options come on screen//
var answersEl = document.createElement('div');
quizBodyEl.appendChild(answersEl);
function showPreviousScore (){
    var previousScore = localStorage.getItem('previous-score');
    if (previousScore){
        previousScoreEl.innerHTML = 'Previous Score: ' + previousScore + '%';
    }
}
var gameEnded = function(){
    questionEl.innerHTML = '';
    answersEl.innerHTML = '';
    var correctAnswers = 0;
    for (var i = 0; i < selectedAnswers.length;i++){
        if (selectedAnswers[i] == questionsArr[i].answer){
            correctAnswers += 1;
        }
    }
var score = Math.round ((correctAnswers / questionsArr.length) * 100);
localStorage.setItem ('previous-score', score);
showPreviousScore();
}

var resetTimer = function(){
    clearInterval(timerId)
    counter = 30;
    countDownEl.innerHTML = counter;
    timerId = setInterval(function () {
        counter = counter - 1;
        countDownEl.innerHTML = counter;
        if (counter == 0) {
            clearInterval(timerId);
            gameEnded();
        }
    }, 1000)
}
var showActiveQuestion = function (){
    questionEl.innerHTML = questionsArr[questionIndex].question;
    answersEl.innerHTML = '';
    questionsArr[questionIndex].options.forEach(function (option) {
        var optionEl = document.createElement('button');
        optionEl.innerHTML = option;
        answersEl.appendChild(optionEl);
        //should show the next question and reset the timer when a correct option is chosen//
        //should show the next question and reset the timer when an incorrect option is chosen//
        optionEl.addEventListener('click', function (e) {
            //to store answer that users select//
            selectedAnswers.push(e.target.innerHTML);
            console.log(selectedAnswers);
            questionIndex = questionIndex + 1;
            showActiveQuestion ();
            resetTimer();
        })
    })
}
//Start button for quiz//
var startQuizEl = document.createElement('button');
startQuizEl.setAttribute('id', 'start-quiz');
startQuizEl.innerHTML = 'Start Quiz!';
quizBodyEl.appendChild(startQuizEl);
startQuizEl.addEventListener('click', function () {
    if (questionIndex == questionsArr.length-1){
        gameEnded();
        clearInterval(timerId);
    }
    //Makes the button function//
   showActiveQuestion();
   resetTimer();
   startQuizEl.remove ();
})
//Should count down from 30 one second at a time//
var countDownEl = document.createElement('p');
countDownEl.innerHTML = '30';
quizBodyEl.appendChild(countDownEl);


//To retrieve previous score if it exists//
var localStorageKey = "previous-score";
var previousScore = localStorage.getItem(localStorageKey);
if (previousScore != null) {
    //insert the previous score//

}
//should show score when game is over and start quiz button//
//If the user has taken the quiz before, the app should display the previous score//
//After the last question is answered or time runs out, the game should display the "start quiz" button//
//A score that is calculated from the amount of correctly answered questions divided by the total number of questions- the number should be rounded to the nearest whole number//
//The quiz should also display a timer that counts down from 30 one second at a time//
//use JavaScript's setInterval and clearInterval methods to create the timer.//
//Selecting one of the options or running out of time should cause the app to immediately cycle to the next question and set of choices in questionsArr//
//There should be no messaging or feedback displayed to the user after making a selection or running out of time//
//To persist score data between games, the application should use the JavaScript localStorage API to store the user's most recent score under the key previous-score after each game and retrieve the score on page load.//
