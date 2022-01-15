var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var newImage;

var score;

var cloudsGroup,obstaclesGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex_collided;

var gameOverImg, restartImg, gameOver, restart;

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

 trex_collided = loadAnimation("trex_collided.png");
 //gargar las imagenes gameover y restart

 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 obstaclesGroup = new Group ();
 cloudsGroup = new Group();


  score = 0; 
 trex.setCollider("circle",0,0,40);
 trex.debug = false;

 //mostramos la imagen
 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;

 restart = createSprite(300,140);
 restart.addImage(restartImg);
 restart.scale = 0.5;
  
}

function draw() {
  background("black");
  fill("white");
  text("puntuacion: " + score,500,50);

  
  if(gameState == PLAY){

   gameOver.visible = false;
   restart.visible = false;

   //mueve el suelo

   ground.velocityX = -4;
  
   // generar puntuacion

   score = score + Math.round(frameCount/60);

   // genera el suelo infinito 

   if (ground.x < 0){
    ground.x = ground.width/2;
  }

  // salto del dinosaurio

  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  
  }
   
  // gravedad del dinosaurio 

  trex.velocityY = trex.velocityY + 0.8

  //aparecer nubes
  spawnClouds();
  //OBSTACUloS EN EL SUELO
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
 
  }else if(gameState == END){

    gameOver.visible = true;
   restart.visible = true;

   //detiene el suelo
   ground.velocityX = 0;
   trex.velocityY = 0;

   //cambia la animacion del trex
    trex.changeAnimation("collided",trex_collided);

   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);

   //establece un ciclo de vida a los objetos del juego par que nunca 
   //sean destruidos
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);

  }
   
  
  
 
  
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();

  
 
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 220;
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    //añade cada nube al grupo 
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles(){
 if(frameCount % 60 == 0){
  obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = -6;

 //generar obstaculos al azar
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: break;
  }
  //asigna escala y siclo de vida
  obstacle.scale = 0.5;
  obstacle.lifetime = 220;

  //añade cada obstaculo al grupo

  obstaclesGroup.add(obstacle);

 }

}
