var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY=1;

var END=0;

var gameState=PLAY;

var restart, restartImage;
var gameOver, gameOverImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  restart = createSprite(300,140);
  restart.addImage("restart",restartImage)
  restart.scale=0.5;
  
  gameOver= createSprite(300,100);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.scale=0.5;
}

function draw() {
  background("white");
  

  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
    
      if(keyDown("space")&&trex.y>140) {
    trex.velocityY = -10;
  }
  
    //gravity
  trex.velocityY = trex.velocityY + 0.8;
    
      if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
      spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       gameState=END;
       }
    
      ground.velocityX = -4;
    
    gameOver.visible=false;
    restart.visible=false;
  
  }
  
  
  else if (gameState===END){
    ground.velocityX=0; 
    trex.velocityY=0;

    //set velcity of each game object to 0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
 
        gameOver.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)){
      restartGame();
    }
    
  }
  


  
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloud.tint="blue";
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    console.log(rand);
   if(rand===1){
      obstacle.addImage("obstacle",obstacle1);
      }
    else if (rand===2){
             obstacle.addImage("obstacle",obstacle2);
             }
    else if(rand===3){
           obstacle.addImage("obstacle",obstacle3);
            }
        else if (rand===4)  {
      obstacle.addImage("obstacle",obstacle4);
      }
    else if (rand===5){
             obstacle.addImage("obstacle",obstacle5);
             }
    else if(rand===6){
           obstacle.addImage("obstacle",obstacle6);
            }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function restartGame (){
  gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;

  trex.changeAnimation("running",trex_running);
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score=0;
  
  
}