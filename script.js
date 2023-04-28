var rod1=document.getElementById("Rod-1");
var rod2=document.getElementById("Rod-2");
var ball=document.getElementById("ball");
var movement=20;

const thisBar1="Rod-1";
const thisBar2="Rod-2";
const storeName="abc";
const storeScore=123;

let whichBar;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let highScore;
let gameStart=false;

localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");
(function(){
    highScore=localStorage.getItem(storeScore);
    whichBar=localStorage.getItem(storeName);
    if(whichBar==="null" || highScore==="null"){
        var name=window.prompt("enter your name");
        // alert("Rod 1 has a minimum score of (highScore*100)");
        alert("welcome Mr "+name+ " click ok below and press enter key to start the game");

        highScore=0;
        whichBar=thisBar1;
    }
    else{
        alert(whichBar + " has maximum score of " + highScore*100);
    }
    gameReset(whichBar);
})();




function gameReset(barName){

    rod1.style.left=((window.innerWidth-rod1.offsetWidth)/2)+"px";
    rod2.style.left=((window.innerWidth-rod2.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";

    if(barName === thisBar1){
        ball.style.top=rod2.getBoundingClientRect().y-rod2.getBoundingClientRect().height+"px";
        moveY=-2;
    }

    else if(barName === thisBar2){
        ball.style.top=rod1.getBoundingClientRect().height+"px";
        moveY=2;       
    }

    score=0;
    gameStart=false;

}




document.addEventListener('keydown',function(event){

    if(event.keyCode==68 || event.keyCode==39){
        if(parseInt(rod1.style.left)<(window.innerWidth-rod1.offsetWidth-border)){
            rod1.style.left=parseInt(rod1.style.left)+movement+'px';
            rod2.style.left=rod1.style.left;
        };

    };

    if(event.keyCode==65 || event.keyCode==37){
        
        if(parseInt(rod1.style.left)>border){
            rod1.style.left=parseInt(rod1.style.left)-movement+'px';
            rod2.style.left=rod1.style.left;
        };

    };

    if(event.keyCode==13){
        
        if(!gameStart){
            gameStart=true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;

            let bar1Height=rod1.offsetHeight;
            let bar2Height=rod2.offsetHeight;
            let bar1Width=rod2.offsetWidth;
            let bar2Width=rod2.offsetWidth;

            ballMoving = setInterval(function(){
            
                let bar1X=rod1.getBoundingClientRect().x;
                let bar2X=rod2.getBoundingClientRect().x;

                let ballCentre=ballX+ballDia/2;

                ballX+=moveX;
                ballY+=moveY;

                ball.style.left=ballX+"px";
                ball.style.top=ballY+"px";

                if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }

                if(ballY<=bar1Height){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<bar1X) || (ballCentre>(bar1X+bar1Width))){
                        dataStoring(score,thisBar2);
                    }
                }
                if((ballY+ballDia)>=(window.innerHeight-bar2Height)){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<bar2X) || (ballCentre>(bar2X+bar2Width))){
                        dataStoring(score,thisBar1);
                    }
                }  
            }, 10);
        }
    }
});

function dataStoring(scoreObtained,winningBar){
    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeName,winningBar);
        localStorage.setItem(storeScore,highScore);
    }
    clearInterval(ballMoving);
    gameReset(winningBar);

    alert(winningBar+" wins with score of "+(scoreObtained*100)+". Max Score is: "+(highScore*100));

    // (highScore*100)
}