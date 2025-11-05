// time

const date = document.getElementById('date');
const currentTime = document.getElementById('currentTime');
let names = document.getElementById("names"); 
let timer = document.getElementById('timer'); //timer
let startTime;
let roundTimes = [];
let timerInterval;
let currentStreak = 0;

let streakDisplay = document.getElementById('streakDisplay');
let leaderboard3 = [];
let leaderboard10 = [];
let leaderboard100 = [];
document.getElementById('lb3').textContent = "Easy:" + leaderboard3.slice(0,5).join(', ');
document.getElementById('lb10').textContent = "Medium: " + leaderboard10.slice(0,5).join(', ');
document.getElementById('lb100').textContent = "Hard: " + leaderboard100.slice(0,5).join(', ');

// Dynamically add a favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';          // Required
favicon.type = 'image/png';     // Can be 'image/x-icon' if .ico
favicon.href = 'favicon.png';   // Path to your favicon file
document.head.appendChild(favicon);



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
            level = Number(levelArr[i].value);
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

    currentStreak++; // increment streak
streakDisplay.textContent = "Current Win Streak: " + currentStreak;
if (level == 3) leaderboard3.push(score);
else if (level == 10) leaderboard10.push(score);
else if (level == 100) leaderboard100.push(score);

updateLeaderboards();


        
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
currentStreak = 0;
streakDisplay.textContent = "Current Level Streak: " + currentStreak;


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

function updateLeaderboards() {
    // Sort each leaderboard ascending (fewest tries first)
    leaderboard3.sort((a,b) => a-b);
    leaderboard10.sort((a,b) => a-b);
    leaderboard100.sort((a,b) => a-b);

    // The divs just stay as headings
    document.getElementById('lb3').textContent = "Easy: ";
    document.getElementById('lb10').textContent = "Medium:";
    document.getElementById('lb100').textContent = "Hard:";

    // Update <ol> top 3 scores
    const ol3 = document.getElementById('lb3').nextElementSibling.children;
    const ol10 = document.getElementById('lb10').nextElementSibling.children;
    const ol100 = document.getElementById('lb100').nextElementSibling.children;

    for (let i = 0; i < 3; i++) {
        ol3[i].textContent = leaderboard3[i] !== undefined ? leaderboard3[i] + " tries" : '___';
        ol10[i].textContent = leaderboard10[i] !== undefined ? leaderboard10[i] + " tries" : '___';
        ol100[i].textContent = leaderboard100[i] !== undefined ? leaderboard100[i] + " tries" : '___';
    }
}
