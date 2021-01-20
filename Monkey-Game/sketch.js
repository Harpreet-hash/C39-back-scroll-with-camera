
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, ground;
var score, gameState, monkey;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
 
}



function setup() {

  createCanvas(400,400)

back=createSprite(200,200 ,800,800);
back.addImage(backImage);
back.scale=2;
back.velocityX=-0.3  ;// given less velocity for back still scrolls so fast bcoz relative velocities of back and monkey add up

ground=createSprite(200,380,800,20);
ground.shapeColor="brown"


monkey=createSprite(10,340,10,50);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;




obstacleGroup=createGroup();
FoodGroup=createGroup();

gameState="play";
score=0;

camera.position.x=50;

  
}



function draw() {

  
  background(255);

  drawSprites();

  ground.x=camera.position.x;
  monkey.x=camera.position.x-100;
  //back.x=camera.position.x;

 console.log(monkey.x)

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(monkey.x%200===0){   //everytime monkey travels 200 px, back.x will come to monkey's position
    back.x=monkey.x
  }
  if(gameState==="play")
      {
        if(keyDown("space")&&monkey.collide(ground)){
        monkey.velocityY=-25;
      }
      monkey.velocityY=monkey.velocityY+2;
      
       if(camera.position.x%300===0){
          spawnObstacles();
       }
       if(camera.position.x%150===0){
          spawnBananas();
       }
       if(obstacleGroup.isTouching(monkey)){
         gameState="over";
         
       }
        if(FoodGroup.isTouching(monkey)){
          FoodGroup.destroyEach();
        }
       
       score=Math.floor(World.frameCount/World.frameRate);
  }
  
  
 
  monkey.collide(ground);
         textSize(20);
  text("Survival Time: "+score,camera.position.x,150);
  fill("red");
  
 if(gameState==="over"){ 
   monkey.velocityX=0;
         
         text("RIP",camera.position.x,200);
         obstacleGroup.destroyEach();
         FoodGroup.destroyEach();

        //  obstacleGroup.setVelocityEach(0,0);
        //  FoodGroup.setVelocityEach(0,0);
        //  obstacleGroup.setLifetimeEach(-1);
        //  FoodGroup.setLifetimeEach(-1);
         
 }
  
  
  camera.position.x+=5;
  camera.position.y=monkey.y-50;
  
  
    
  
}
function spawnObstacles(){
 
  var obstacle=createSprite(random(camera.position.x+200,camera.position.x+500),353,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
 // obstacle.x=random(400,500);
  
  obstacleGroup.add(obstacle);
  //obstacle.velocityX=-5;
  obstacle.lifetime=280;

  //How to decide lifetime??
  //camera.x incrementing by 2 per frame. So, camera's velocity is 2px/frame
  //an obstacle is made max 500 px from monkey, so monkey travels 500px till both are at same position,
  //then some more dist(half canvas width i.e 200) before obstacle goes outside canvas
  //total is arnd 700px. speed is 2px/frame, so lifetime arnd 350
  
}
function spawnBananas(){
  var banana=createSprite(random(camera.position.x+200,camera.position.x+500),350,10,10);
  banana.y=random(250,300);
  console.log("ho rahe")

  banana.addImage(bananaImage);
  banana.scale=0.05; 
  FoodGroup.add(banana);
  //banana.velocityX=-5;
  banana.lifetime=280;
 



  
}






