// time
const date = document.getElementById('date');
const correntTime = document.getElementById('currentTime');
let names = document.getElementById("names"); 

date.textContent = time();
currentTime.textContent = now(); 
//global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName('level');
const scoreArr = []; //the array itself is constant, but the stuff inside of it is not constant.

//event listeners
playBtn.addEventListener('click',play);
guessBtn.addEventListener('click',makeGuess);


function time(){
    let d = new Date();
    //concatenate the date and time
    let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let day = dayArr[d.getDay()];
    let monthName = monthArr[d.getMonth()];
    let dateNum = d.getDate();
    let ending = ''; 
    if (dateNum ==1 || dateNum ==21|| dateNum == 31){
        ending = 'st';
    }
    else if (dateNum == 2 || dateNum == 22){
        ending = 'nd';
    }
    else if (dateNum == 3 || dateNum == 23){
        ending = 'rd';
    }
    else{
        ending = 'th';
    }
    let str = monthName + ' ' + dateNum + ending + ', ' + d.getFullYear() + ' -- ' + day;
    return str;
}
function now(){
    let a = new Date();
    let hours = a.getHours();
    let minutes = a.getMinutes();
    let seconds = a.getSeconds();
    let ampm = '';
    if (hours>=12){
        ampm = 'PM';
    }
    else{
        ampm = 'AM';
    }
    if (hours >12){
        hours-= 12;
    }
    else if (hours ==0){
        hours = 12;
    }
    if (minutes<10){
        minutes = '0'+ minutes;
    }
    const currentTime = document.getElementById('currentTime'); // make sure you have <p id="currentTime"></p>
    setInterval(function() {
    currentTime.textContent = now();
    }, 1000);
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    return hours + ":" + minutes + ':' + seconds + ' ' + ampm;
    
}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i = 0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if (levelArr[i].checked){
            level = levelArr[i].value;
        }
    }
    answer  = Math.floor(Math.random()*level)+1; 
    msg.textContent = 'Guess a number between 1-' + level;
    guess.placeholder = answer; //shows preview of ansewr ( in grey) // change later
    score = 0;

}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if (isNaN(userGuess)){
        msg.textContent = 'INVALID, please guess a number ' + names.value + '!';
        return;
    }
    else if (userGuess<1){
        msg.textContent = 'Not a valid number ' + names.value;
        return;
    }
    else if (userGuess>level){
        msg.textContent = 'Not a valid number ' + names.value;
        return;
    }
    score++;
    if (userGuess==answer){
        msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries.';
        reset();
        updateScore();
    }
    else if (userGuess>answer){
        msg.textContent = 'Too high! Guess again ' + names.value ;
    }
    else if (userGuess<answer && userGuess>0){
        msg.textContent = 'Too low! Guess again ' + names.value;
    }
}
function reset(){
    guessBtn.disabled = true;
    guess.value = '';
    guess.placeholder = '';
    guess.disabled = true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);//adds currect score to array of scores
    wins.textContent = 'Total wins: ' + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a,b) => a-b) // sorts ascending, but if we wanted to do descending, we would write b-a
    // leaderboard?
    const lb = document.getElementsByName('leaderboard');

    for (let i = 0; i<scoreArr.length;i++){
        sum+=scoreArr[i];
        if (i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/(scoreArr.length);
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}