var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0
var banana;
var size=2;
var gameOver;
var bnImg;
var stImg;
var reset
var reImg;
var goImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   bnImg=loadImage("banana.png")
   stImg=loadImage("stone.png")
   goImg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  FoodGroup=new Group();
  ObstacleGroup=new Group();

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);
  if(gameState===PLAY){
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space")&&player.y >=200) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    
    if(FoodGroup.isTouching(player)){
     FoodGroup.destroyEach();
     score=score+1
     
    }
    if(score%4===0 && score!==0){
     player.scale=0.3
    }

     if(ObstacleGroup.isTouching(player)&&player.scale===0.3){
      size=size+1
      player.scale=0.1
      ObstacleGroup.destroyEach();
     }
     if(ObstacleGroup.isTouching(player)&&size===3){
      gameState=END
     }
     if(ObstacleGroup.isTouching(player)&&player.scale===0.1){
      gameState=END
    }
    
    console.log(size)
    player.collide(ground);
    spawnObstacle();
    spawnFruits();
    drawSprites();
    fill(225)
    stroke(225)
    textSize(20)
    text("SCORE : "+score,680,60)
  }
  if(gameState===END){
    background(goImg)
    fill(225)
    stroke(225)
    textSize(25)
  text("PRESS 'A' TO RESTART ",400,370)
    
  if(keyDown("A")){
  gameState=PLAY
  score=0
  size=2
  }
  }
}
function spawnFruits(){
  if (frameCount%80===0){
    banana=createSprite(800,100,10,10);
    banana.y = Math.round(random(150,250));
    banana.addImage(bnImg);
    banana.scale=0.07
    banana.velocityX=-8;
    banana.lifetime=300
   FoodGroup.add(banana)
     }
}
function spawnObstacle(){
  if(frameCount%200===0){
    stone=createSprite(800,330,20,20);
    stone.addImage(stImg);
    stone.scale=0.3;
    stone.velocityX=-8;
    stone.lifetime=800;
    ObstacleGroup.add(stone)
   
}
}
