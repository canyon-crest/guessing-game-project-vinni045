// time
const date = document.getElementById('date');
const currentTime = document.getElementById('currentTime');
let names = document.getElementById("names"); 
let timer = document.getElementById('timer'); //timer
let startTime;
let roundTimes = [];
let timerInterval;

date.textContent = time();
currentTime.textContent = now(); 
//global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName('level');
const scoreArr = []; //the array itself is constant, but the stuff inside of it is not constant.

//event listeners
playBtn.addEventListener('click',play);
guessBtn.addEventListener('click',makeGuess);
giveUpBtn.addEventListener('click',giveUp);


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
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    // setInterval(function() {
    // currentTime.textContent = now();
    // }, 1000);
    // if (seconds < 10){
    //     seconds = '0' + seconds;
    // }
    return hours + ":" + minutes + ':' + seconds + ' ' + ampm;
}
setInterval(function() {
    currentTime.textContent = now();
}, 1000);
    
function play(){
    
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    guess.disabled = false;
    if (names.value == ''){
        msg.textContent = 'Please enter your name to play!';
        playBtn.disabled = false;
        guessBtn.disabled = true;
        giveUpBtn.disabled = true;
        guess.disabled = true;
        return;
    }
    names.value = names.value.charAt(0).toUpperCase() + names.value.substring(1).toLowerCase(); //capitalize first letter of name
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
    startTimer();

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
    // good bad ok and score//
    if (userGuess==answer){
        //level 3//
        if (level==3 && score==1){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is great!';
        }
        else if (level==3 && score ==2){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is good.';
        }
        else if (level==3 && score >2){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is bad.';
        }
        //level 100//
        if (level==100 && score<=3){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is excellent!';
        }
        else if (level==100 && score==4 || score==5){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is good.';
        }
        else if (level==100 && score==6){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is ok.';
        }
        else if (level==100 && score>=7){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is bad.';
        }
        //level 10//
        if (level==10 && score==1){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is excellent!';
        }
        else if (level==10 && score==2){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is great.';
        }
        else if (level==10 && score==3){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is good.';
        }
        else if (level==10 && score==4){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is ok.';
        }
        else if (level==10 && score>4){
            msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries. Your score is bad.';
        }

        let endTime = new Date().getTime();
    let roundTime = Math.floor((endTime - startTime)/1000); // in seconds
    roundTimes.push(roundTime);

    // display fastest win
    let fastest = Math.min(...roundTimes);
    fastestWin.textContent = "Your Fastest Win: " + fastest + "s";

    // display average time
    let sumTime = roundTimes.reduce((a,b) => a+b, 0);
    let avgTimeVal = (sumTime / roundTimes.length).toFixed(1);
    avgTime.textContent = "Average Time: " + avgTimeVal + "s";
        
        reset();
        updateScore();
        giveUpBtn.disabled = true;
    }
    // if (userGuess==answer){
    //     msg.textContent = 'Good job ' + names.value + '! '+ 'You are correct, and you took ' + score + ' tries.';
    //     reset();
    //     updateScore();
    //     giveUpBtn.disabled = true;
    // }
    else {
        let diff = Math.abs(userGuess - answer);
        let maxDiff = level; // highest possible difference
        let percent = (diff / maxDiff) * 100;
        let hint = '';

        if (percent >= 60){ 
            hint = 'You are cold!';
        }
        else if (percent >= 30) {
            hint = 'You are warm!';
        }
        else {
            hint = 'You are hot!';
        }
        msg.textContent = hint + ' Try again, ' + names.value + '!';
    }
    clearInterval(timerInterval);


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
function giveUp(){
    giveUpBtn.disabled = true;
    msg.textContent = 'The correct answer was ' + answer + '. Better luck next time ' + names.value + '!';
    score = Number(level);
    let endTime = new Date().getTime();
let roundTime = Math.floor((endTime - startTime)/1000);
roundTimes.push(roundTime);

// update fastest and average times
let fastest = Math.min(...roundTimes);
fastestWin.textContent = "Your Fastest Win: " + fastest + "s";

let sumTime = roundTimes.reduce((a,b) => a+b, 0);
let avgTimeVal = (sumTime / roundTimes.length).toFixed(1);
avgTime.textContent = "Average Time: " + avgTimeVal + "s";
clearInterval(timerInterval);

    reset();
    updateScore();
}
function startTimer(){
     startTime = new Date().getTime(); // capture start time

    // clear any previous interval
    if(timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        let currentTime = new Date().getTime();
        let seconds = Math.floor((currentTime - startTime)/1000);
        timer.textContent = "Timer: " + seconds + "s";
    }, 1000);
}
