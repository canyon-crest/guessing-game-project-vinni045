// time
date.textContent = time();

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
    let str = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
    return str;
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
        msg.textContent = 'INVALID, please guess a number';
        return;
    }
    else if (userGuess<1){
        msg.textContent = 'Not a valid number'
        return;
    }
    else if (userGuess>level){
        msg.textContent = 'Not a valid number'
        return;
    }
    score++;
    if (userGuess==answer){
        msg.textContent = 'Good job! You are correct, and you took ' + score + ' tries.';
        reset();
        updateScore();
    }
    else if (userGuess>answer){
        msg.textContent = 'Too high! Guess again';
    }
    else if (userGuess<answer && userGuess>0){
        msg.textContent = 'Too low! Guess again';
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