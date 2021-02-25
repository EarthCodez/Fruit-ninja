var gamestate="wait";
var f1img,f2img,f3img,f4img,enemyan,overimg;
var swordimg;
var sword;
var fruitGroup;
var enygrp;
var score=0;
var highscore=0;
var gomp3,cutmp3;
function preload(){
  f1img=loadImage("fruit1.png");
  f2img=loadImage("fruit2.png");
  f3img=loadImage("fruit3.png");
  f4img=loadImage("fruit4.png");
  enemyan=loadAnimation('alien1.png','alien2.png')
  swordimg=loadImage('sword1.png');
  overimg=loadImage("gameover.png");
  gomp3=loadSound('gameover.mp3');
  cutmp3=loadSound('cut.mp3')
}
function setup(){
  createCanvas(600,400)
fruitGroup=createGroup();
  enygrp=createGroup();
sword=createSprite(300,200,20,20);
sword.addImage(swordimg);
sword.scale=0.6;
  sword.debug=true;
}
function draw(){
  background('lightBlue');
  framerate=60;
  sword.setCollider('circle',0,0,40);
  if(keyDown("space")&&gamestate=="wait"){
    gamestate='play';
    sword.addImage(swordimg);
    cursor('grab');
  }
  textSize(20);
  text("score:"+score,510,20);
  if(sword.isTouching(fruitGroup)){
    score+=1;
    fruitGroup.destroyEach();
    cutmp3.play();
  }
  text("Highscore:"+highscore,10,20);
  if(gamestate=="play"){
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  fruits();
  Enemy();
  }
  if(sword.isTouching(enygrp)){
    gamestate="over";
    enygrp.destroyEach();
    gomp3.play();
  }
  if(gamestate=="over"){
    restart();
    sword.addImage(overimg);
    sword.x=300;
    sword.y=200;
    cursor('cell')
  }
  drawSprites();
}
function fruits(){
   var rn=Math.round(random(1,4));
   var lr=Math.round(random(1,2));
   if(frameCount%60==0){
   var fruit=createSprite(450,Math.round(random(0,400)),20,20);
   fruit.scale=0.17;
   switch(lr){
   case 1:fruit.x=-20
    fruit.velocityX=10
       break;
       case 2:fruit.x=650
       fruit.velocityX=-20
       break;
       default:
       break;
   }
       if(score>4){
       switch(lr){
   case 1:fruit.x=-10
    fruit.velocityX=20
       break;
       case 2:fruit.x=650
       fruit.velocityX=-20
       break;
       default:
       break;
   }
  }
   switch(rn){
   case 1:fruit.addImage(f1img)
   break;
   case 2:fruit.addImage(f2img)
   break;
   case 3:fruit.addImage(f3img)
   break;
   case 4:fruit.addImage(f4img)
   break;
   default:
   break;
    }
   fruit.lifetime=100;
   fruitGroup.add(fruit);
  }
}
function Enemy(){
  var lr=Math.round(random(1,2));
  if(frameCount%120==0){
  var enemy=createSprite(450,Math.round(random(0,400)),60,60);
    enemy.addAnimation("enemy",enemyan);
    enemy.scale=0.8;
    enygrp.add(enemy);
    enemy.lifetime=100;
    switch(lr){
    case 1:enemy.x=-10
    enemy.velocityX=+20;
    break;
    case 2:enemy.x=650
    enemy.velocityX=-20
    break;
    default:
    break;
    }
    if(score>10){
    enemy.addAnimation("enemy",enemyan);
    enemy.scale=0.6;
    enygrp.add(enemy);
    enemy.lifetime=45;
    switch(lr){
    case 1:enemy.x=-20
    enemy.velocityX=+10;
    break;
    case 2:enemy.x=650
    enemy.velocityX=-20
    break;
    default:
    break;
    }
    console.log(enemy.x);
}
}
}
function restart(){
  text("smash your spacebar to restart",150,150)
  if(keyDown('space')&&gamestate=="over"){
  gamestate="wait";
    score=0;
     }
  if(score>highscore){
    highscore=score;
  }
}