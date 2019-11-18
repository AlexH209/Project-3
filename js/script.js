//-----Declare our Variables-----//

let totalScore = 0;
let incorrect = 0;
let totalQuestions = 20;
let timer = 20;
let currentHealth = 100;
let totalHealth = 100;

let tQuestions = [];

let easyMode = "../data/easy.json";
let mediumMode = "../data/medium.json";
let hardMode = "../data/hard.json";

let qNum = 0;

let interval;

//-----Grab all our elements from html page-----//

//correct, counter, questions, buttons - using a class//

let correct = document.getElementById('correct');
let counter = document.getElementById('counter');
let eQuestions = document.getElementById("eQuestions");

let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let a3 = document.getElementById('a3');
let a4 = document.getElementById('a4');

let injectOptions = document.getElementById('injectOptions');
let injectOptionsBtn = document.getElementById('injectOptionsBtn');

//-----Get our Buttons and add EventListeners-----//

let aButtons = document.getElementsByClassName('aBtns');

for(let i = 0; i < aButtons.length; i++){
    //going to add our eventlisteners
    aButtons[i].addEventListener('click', function(event){
        //alert("You clicked a Button");
        //Call our next function
        //console.log(event);
        //checkAnswer(buttons[i].innerText);
        checkAnswer(event.toElement.innerText);
    });
}

//-----Create our JSON data Load-----//

function loadJSON(url){
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Version 1
            let myArr = this.responseText;//let myArr = JSON.parse(this.responseText)
            //tQuestions = myArr.easyQ;
            //console.log(myArr);
            //Version 2
            tQuestions = JSON.parse(this.responseText).easyQuestions;
            console.log(tQuestions);
            counter.innerText = timer;
            interval = setInterval(updateTime, 1000);
            loadQuestions();
            if(url == "../options.html"){
                optionsLoad(myArr);
                console.log(myArr);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}

//------------------------------------------//

function loadQuestions(){
    //Load the next question
    eQuestions.innerText = tQuestions[qNum].q;
    a1.innerText = tQuestions[qNum].a1;
    a2.innerText = tQuestions[qNum].a2;
    a3.innerText = tQuestions[qNum].a3;
    a4.innerText = tQuestions[qNum].a4;
}

//------------------------------------------//

function checkAnswer(answer){
    //Retrieve the answer and see if it is correct
    //Increment your correct number

    if(answer === tQuestions[qNum].correct){
        totalScore++;
    }
    else{
        incorrect--;
    }
    correct.innerText = `${totalScore}/${totalQuestions}`;
    timer = 20;
    counter.innerText = timer;
    //Go to next Question
    nextQuestion();
    if(answer !== tQuestions[qNum].correct){
        currentHealth = currentHealth - 6.25;
    }
    health.innerText = `${currentHealth}/${totalHealth}`;
}

//-----Next Question-----//

function nextQuestion(){
    //Prep to go to next question
    //loadQuestion

    if(qNum < totalQuestions){
        //Will run until you hit total questions = 20;
        qNum++;
        loadQuestions();
    }
    else{
        //Load up Ending Screen
        //Clears the Innterval set in LoadJSON
        clearInterval(interval);
        //Inject your Ending Scren HTML Below
        alert("You finished the game. Congrats.");
    }
    if(currentHealth == 0){
        alert("You have fainted.");
    }
}


//------------------------------------------//
loadJSON(easyMode);


//-----Set out Timer-----//

function updateTime(){
    //Make sure time isn't over and it is showing correct time.

    timer--;
    if(timer < 0){
        timer = 20;
        counter.innerText = timer;
        nextQuestion();
    }
    else{
        counter.innerText = timer;
    }
}
//------------------------------------------------------------//

function optionsLoad(info){
    injectOptions.innerHTML = info;
}

injectOptionsBtn.addEventListener('click', function (event){
    loadJSON("../options.html");
});

//------------------------------------------------------------//

/*let easyButton = document.getElementById('easyButton'),
    mediumButton = document.getElementById('mediumButton'),
    hardButton = document.getElementById('hardButton'),
    howButton = document.getElementById('howButton'),
    optionsButton = document.getElementById('optionsButton'),
    backButton = document.getElementById('backButton'),
    optionsScreen = document.getElementById('optionsScreen');

optionsButton.addEventListener('click', function (event) {
    menuButtons();

    optionsScreen.innerHTML = '<div id="bgOptionsColor" class="bg-dark d-flex justify-content-center align-items-end pb-5 row" style="height: 100vh; width: 100vw; opacity: 75%;">' +
        '<div class="col-12"><a href="#" id="musicButton" class="col-2 btn text-dark bg-white border-dark rounded-0" style="font-size: 35px; opacity: 75%;">Music On/Off</a></div>' +
        '<div class="col-12"><a href="#" id="backMenuButton" class="col-2 btn text-dark bg-white border-dark rounded-0" style="font-size: 35px; opacity: 75%;">Back</a></div>'

    backMenuButton.addEventListener('click', function (event) {
        optionsScreen.innerHTML = '';

    });
});

function menuButtons(){
    easyButton.style.display = 'none';
    mediumButton.style.display = 'none';
    hardButton.style.display = 'none';
    howButton.style.display = 'none';
    optionsButton.style.display = 'none';
    backButton.style.display = 'none';

    easyButton.classList.display = 'none'
}*/

//-------------------------------------------------------------//

/*function allQuestions(q){
    console.log(q.easyQuestions[26]);
    let qNum = 0;
    for (let i = 0; i < totalQuestions; i++){
        qNum = Math.floor(Math.random() * q.ezQ.length);
        triviaQ.push(q.easyQuestions[qNum]);
        q.easyQuestions.splice(qNum, 1);
    }
}*/
