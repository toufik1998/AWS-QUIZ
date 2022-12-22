// select elements of stepper components
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");


// Select Elements of quiz section
let containerInstructions = document.querySelector('.quiz-instructions');
let containerQuizApp = document.querySelector('.quiz-app');
let countSpan = document.querySelector(".quiz-info .count .counter");
let containerBullets = document.querySelector(".bullets");
let containerSpans = document.querySelector('.bullets .spans');
let containerQuestion = document.querySelector('.quiz-area');
let containerAnswers = document.querySelector('.answer-area');
let submitBtn = document.querySelector('.submit-button');
let containerResult = document.querySelector('.results');
let containerCountDown = document.querySelector('.countdown');
let containerEplanation = document.querySelector('.explanation');
let incorrectAnswer = document.querySelector('.incorrect-answer');

// Set Options
let currentIndex = 0;
let rightAnswerCount = 0;
let countDownInterval;
let arrayBadResopone = [];
let bolckDeplicate = false;


// fetch('../aws_questions.json')
//     .then((response) => {
//       if (response.status >= 200 && response.status <= 299) {
//         return response.json();
//       } else {
//         throw Error(response.statusText);
//       }
//     })
//     .then((data) => {
//       let qCount = data.length;

//       // create bullets + set questions count
//       creatBullets(qCount);

//       // add questions data to user interface
//       addQuestionData(data[currentIndex], qCount);

//       // start countdown duration
//       countDown(30, qCount);

//       // click on submit button
//       submitBtn.onclick = () => {
//         //  get the right answer
//         let theRightAnswer = data[currentIndex].right_answer;

//         // increase the current question
//         currentIndex++;

//         // check the answer
//         checkAnswer(theRightAnswer, qCount);

//         // empty question title and answers area after the click of submit
//         containerQuestion.innerHTML = '';
//         containerAnswers.innerHTML = '';

//         // set the next question after the click submit button
//         addQuestionData(data[currentIndex], qCount);

//         // handle bullets
//         handleBullets();

//         // start countdown duration
//         clearInterval(countDownInterval);
//         countDown(30, qCount);

//         // Show result
//         showResult(qCount);
//       }

//     })
//     .catch((error) => {
//       console.log(`Sorry ${error}`);
//     });

function fetchData() {
    fetch('../aws_questions.json')
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      let qCount = data.length;
    //   for(let i = 0; i < qCount; i++){
    //     console.log(data[i].right_answer);
    //   }

    
      // create bullets + set questions count
      creatBullets(qCount);

      // add questions data to user interface
      addQuestionData(data[currentIndex], qCount);

      // start countdown duration
      countDown(30, qCount);

      // click on submit button
      submitBtn.onclick = () => {
        //  get the right answer
        let theRightAnswer = data[currentIndex].right_answer;

        // increase the current question
        currentIndex++;

        // check the answer
        checkAnswer(theRightAnswer, qCount);

        // empty question title and answers area after the click of submit
        containerQuestion.innerHTML = '';
        containerAnswers.innerHTML = '';

        // set the next question after the click submit button
        addQuestionData(data[currentIndex], qCount);

        // handle bullets
        handleBullets();

        // start countdown duration
        clearInterval(countDownInterval);
        countDown(30, qCount);

        // Show result
        showResult(qCount, data);

        
      }

    })
    .catch((error) => {
      console.log(`Sorry ${error}`);
    });

}    


function creatBullets(num) {
    countSpan.innerHTML = num;

    // Create spans
    for(let i = 0; i < num; i++){
        // create bullets
        let theBullet = document.createElement('span');

        if(i === 0){
            theBullet.classList.add("on");
        }

        // append bullets to main container
        containerSpans.appendChild(theBullet);
    }
}

function addQuestionData(obj, count) { 
    
    if(currentIndex < count){
    
    // create H2 question title
    let questionTitle = document.createElement('h3');
    let questionId = document.createElement('span');

    // create question text
    let questionText = document.createTextNode(obj.title);
    let questionIdText = document.createTextNode(currentIndex);
    questionId.appendChild(questionIdText);
    questionTitle.appendChild(questionText);
    questionTitle.appendChild(questionId);

    // append question to question area into user interface
    containerQuestion.appendChild(questionTitle);

    for(let i = 1; i <= 4; i++){
        let mainDiv = document.createElement('div');
        mainDiv.className = 'answer';

        // create radio input
        let radioInput = document.createElement('input');

        // add type + id + data-attributes
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

        if(i === 1){
            radioInput.checked = true;
        }

        // create the label
        let theLabel = document.createElement('label');
        theLabel.htmlFor = `answer_${i}`;

        // create label text
        let labelText = document.createTextNode(obj[`answer_${i}`]);
        
        // append labeltext to the label
        theLabel.appendChild(labelText);


        // append input radio & label to the main div 
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);

        // append the mainDiv (answer) into container of Answers
        containerAnswers.appendChild(mainDiv);

    }
    }
}


function checkAnswer(rightAnswer, count) {
    let obj={};

    // console.log(rightAnswer);
    // console.log(count);

    let answers = document.getElementsByName("question");
    let choosenAnswer;

    for(let i = 0; i < answers.length; i++){
        if(answers[i].checked){
            choosenAnswer = answers[i].dataset.answer;
        }
    }

    if(rightAnswer === choosenAnswer){
        rightAnswerCount++;

    }else{
        let containerQuestionId = document.querySelector('h3 span');
        obj.idQuestion=containerQuestionId.innerHTML;
        obj.Answear=choosenAnswer;
        // console.log(obj);
        arrayBadResopone.push(obj);
    }
    // console.log(arrayBadResopone);
}

// console.log(arrayBadResopone);

function handleBullets() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) =>{
        if(currentIndex === index){
            span.className = "on";
        }
    })
}

containerEplanation.style.display = 'none';
function showResult(count, data) {
    let theResult;
    let arrExplanation = [];

    if(currentIndex === count){
        // add active class to the result stepper component
        one.classList.add("active");
        two.classList.add("active");
        three.classList.add("active");

        // hide other elements
        containerQuestion.remove();
        containerAnswers.remove();
        containerBullets.remove();
        submitBtn.remove();

        if(rightAnswerCount > (count / 2) && rightAnswerCount < count){
            theResult = `
                <span class="good">Good</span>, ${rightAnswerCount} From ${count}
            `;
        }else if(rightAnswerCount === count){
            theResult = `
                <span class="perfect">Perfect</span>, ${rightAnswerCount} From ${count}
            `;
        }else{
            theResult = `
                <span class="bad">Bad</span>, ${rightAnswerCount} From ${count}
            `;
        }

        containerResult.innerHTML = `
            ${theResult} <span><button class="other-exam" onclick="anotherEXam()">Take Another Exam</button></span>
        `;
        

        console.log(arrayBadResopone);
        console.log(data);

        for(let i = 0; i < count; i++){
            for(let j = 0; j < arrayBadResopone.length; j++){
                if(data[i]["id"] == arrayBadResopone[j]["idQuestion"] ){
                    // console.log(data[i]);
                    arrExplanation.push(data[i]);
                }
            }
        }

        console.log(arrExplanation);
        containerEplanation.style.display = 'block';
        for(let i = 0; i < arrExplanation.length; i++){
            containerEplanation.innerHTML += `
                    
                    <div class="incorrect-answer">
                        <div class="answer">
                            
                            <p>
                                <span>${arrExplanation[i].id + 1}</span> 
                                ${arrExplanation[i].title}
                            </p>
                        </div>
                        <div class="explain-answer">
                            <p>
                                ${arrExplanation[i].explanation}
                            </p>
                            
                        </div>
                    </div>
            `;
        }
    }
}


function countDown(duration, count) {
    if(currentIndex < count){
        let minutes, seconds;
        countDownInterval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}`: seconds;
            containerCountDown.innerHTML = `
                ${minutes}:${seconds}
            `;

            if(--duration < 0){
                clearInterval(countDownInterval);
                submitBtn.click();
            }
        }, 1000);
    }
}


// steper components script
one.classList.add("active");
containerQuizApp.style.display = 'none';
// one.onclick = function() {
//     containerQuizApp.style.display = 'none';
//     containerInstructions.style.display = 'block';
//     one.classList.add("active");
//     two.classList.remove("active");
//     three.classList.remove("active");
    
// }

two.onclick = function() {
   

    if(!bolckDeplicate){
        fetchData();
        containerInstructions.style.display = 'none';
        containerQuizApp.style.display = 'block';
        one.classList.add("active");
        two.classList.add("active");
        three.classList.remove("active");
    }

    
    bolckDeplicate = true;


    
   
}


// three.onclick = function() {
//     one.classList.add("active");
//     two.classList.add("active");
//     three.classList.add("active");
    
// }

function anotherEXam() {
    location.reload();
}


//We're going to use "check" to get the ckeckbox element
const check=document.getElementById("check");

//If darkMode doesn’t exist in the LocalStorage, create it. False by default
if (localStorage.getItem('darkMode')===null){
    localStorage.setItem('darkMode', "false");
}

//Create a link tag to later link the CSS file we want
const link = document.createElement('link');
link.rel = 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(link);

//Or we can create the tag in the HTML and later reference in our code
//const link=document.getElementsByTagName("link");  

//checkStatus is only called one time in the program, when you reload the page
//It gives the page it's default look, depening on waht darkMode is set to it will load one css or another
checkStatus()

function checkStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        check.checked = true;                           //the checkbox is checked (if you load the page by default it isn’t)
        link.href = 'sass/darkmode.css';                   //since it's true we load the dark theme CSS
    }else{
        check.checked = false;                          //the checkbox is unchecked
        link.href = 'sass/main.css';
    }
}

function changeStatus(){                                //This function gets called every time the checkbox is clicked
    if (localStorage.getItem('darkMode')==="true"){     //if darkMode was active and this function is called it means the user now wants light
        localStorage.setItem('darkMode', "false");      //so we set it to false, to indicate we are in light mode
        link.href = 'sass/main.css';
    } else{
        localStorage.setItem('darkMode', "true");       //same code but adapted for dark theme
        link.href = 'sass/darkmode.css';
    }
}


