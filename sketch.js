var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0
var score;
var ground;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(200,260,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  //ground.x=ground.width/2;
  ground.velocityX = -4;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background("green");
  
  stroke("black");
  fill("black");
  text("Score: "+score,50,40);
  
  
  if(gameState === PLAY){
    ground.x=ground.width/2;
  
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
      }
  
      monkey.velocityY = monkey.velocityY + 0.8
      monkey.collide(ground);
  
    if(FoodGroup.isTouching(monkey)){
    score = score+2
    FoodGroup.destroyEach();
    }
    if(score === 10){
    monkey.scale = 0.15;
    }
    if(score === 20){
      monkey.scale = 0.2;
    }
    if(score === 30){
      monkey.scale = 0.25;
    }
    if(score === 40){
      monkey.scale = 0.3;
    }
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState === END;
  }
  if(gameState === END){
    monkey.scale = 0.1;
  }
  stroke("black");
  fill("black");
  survivalTime = survivalTime+Math.round(getFrameRate()/60);
  text("Survival Time: "+survivalTime,50,20)

  bananas();
  obstacles();
  
  drawSprites();
}

function bananas(){
  if(frameCount % 80 === 0){
  banana = createSprite(200,200,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(170,200));
  FoodGroup.add(banana);
  banana.lifetime = 150;
  }

}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(200,200,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.y = Math.round(random(170,200));
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
  
  
  
}



