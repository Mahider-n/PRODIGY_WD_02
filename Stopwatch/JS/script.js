const playButton=document.getElementsByClassName("play")[0];
const lapButton=document.getElementsByClassName("lap")[0];
const resetButton=document.getElementsByClassName("reset")[0];
const cleanButton=document.getElementsByClassName("lap-clear-button")[0];

const second=document.getElementsByClassName("sec")[0];
const minute=document.getElementsByClassName("minute")[0];

const centiSecond=document.getElementsByClassName("msec")[0];
const laps=document.getElementsByClassName("laps")[0];
const bg=document.getElementsByClassName("outer-circle")[0];



let secCounter=0;
let sec;
let centiSec;
let centiCounter=0;
let min;
let minCounter=0;
let isReset=false;
let isPlay=false;
let lapItem=0;

// hide/show reset and lap buttons 
const toggleButton=()=>{
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");

};
const play=()=>{
    //start the stopwatch
    if(!isPlay && isReset){
        playButton.innerHTML="pause";
        bg.classList.add("animation-bg")
        min=setInterval(() => {
            min.innerHTML=`${++minCounter} :;`
            
        },60*1000);
        sec=setInterval(() => {
                if(secCounter===60){
                    secCounter=0;
                }
                second.innerHTML=`&nbsp${++secCounter} :`;
            },1000);
        centiSec=setInterval(() => {
                if(centiCounter===100){
                    centiCounter=0;
                }
                centiSecond.innerHTML=`&nbsp${++centiCounter}`;
                },10);
        isPlay=true;
        isReset=true;
        //pause the stopwatch
    }else{
        playButton.innerHTML="Play";
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay=false;
        isReset=false;
        bg.classList.remove("animation-bg")
    }
    toggleButton();
};

//reset function
const reset=()=>{
    isReset=true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    second.innerHTML='&nbsp;0 :'
    centiSecond.innerHTML='&nbsp;0';
    minute.innerHTML='0 :'

}
//lap function
const lap =()=>{
    const li=document.createElement("li");
    const number=document.createElement("span");
    const timeStamp=document.createElement("span");

    li.setAttribute("class","lap-item ");
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");
    
    number.innerText=`#${++lapItem}`
    timeStamp.innerHTML=`${minCounter}: ${secCounter}: ${centiCounter}`;
    li.append(number,timeStamp);
    laps.append(li);
    cleanButton.classList.remove("hidden");

}
//clearall function
const clearAll=()=>{
    laps.innerHTML='';
    laps.append(cleanButton);
    cleanButton.classList.add("hidden");
    lapItem=0;
}
//adding eventlistener to the buttons
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
lapButton.addEventListener("click",lap);
cleanButton.addEventListener("click",clearAll);