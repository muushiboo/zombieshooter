var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombiesGroup
var heartoneImg, hearttwoImg, heartthreeImg
var heart1, heart2, heart3
var bullets=70
var bullet, bulletGroup
var gameState="fight"
var life=3
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")

  heartoneImg = loadImage("assets/heart_1.png")
  hearttwoImg = loadImage("assets/heart_2.png")
  heartthreeImg = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
heart1= createSprite(displayWidth-137,40,20,20)
heart1.addImage(heartoneImg)
heart1.scale = 0.4

heart2= createSprite(displayWidth-180,40,20,20)
heart2.addImage(hearttwoImg)
heart2.scale = 0.4

heart3= createSprite(displayWidth-220,40,20,20)
heart3.addImage(heartthreeImg)
heart3.scale = 0.4

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombiesGroup= new Group();
   bulletGroup= new Group();
}

function draw() {
  background(0); 


if(gameState==="fight"){
if(life===3){
  heart3.visible=true
  heart2.visible=false
  heart1.visible=false
}

if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false
}

if(life===1){
  heart3.visible=false 
  heart2.visible=false
  heart1.visible=true 
}

if(life===0){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=false

  gameState="lost"
}

if(score===100){
  gameState="won"
}

if(bullets===0)(
  gameState="bullet"
)
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  player.depth=bullet.depth
  player.depth=player.depth+2
  bullets=bullets-1
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  if(bullets===0){
    gamestate="bullet"
  }
if(zombiesGroup.isTouching(bulletGroup)){
  for(var i = 0; i< zombiesGroup.length; i++){
    if(zombiesGroup[i].isTouching(bulletGroup)){
      zombiesGroup[i].destroy()
      bulletGroup.destroyEach()
      score=score+10
    }
  }
}

if(zombiesGroup.isTouching(player)){
  for(var i = 0; i< zombiesGroup.length; i++){
    if(zombiesGroup[i].isTouching(player)){
      zombiesGroup[i].destroy()
      life=life-1
    }
  }
}


enemy()
}

drawSprites();
textSize(25)
fill("white")
text("Bullets:"+bullets,displayWidth-210,displayHeight/2-250)
text("Score:"+score,displayWidth-200,displayHeight/2-220)
text("Lives:"+life,displayWidth-200,displayHeight/2-280)


if(gameState==="lost"){
textSize(50)
fill("white")
text("You lost! the city has fallen to the zombies.",20,400)
zombiesGroup.destroyEach()
player.destroy()
}
else if(gameState==="won"){
textSize(70)
fill("white")
text("You won!The city is saved.",30,400)
zombiesGroup.destroyEach()
player.destroy()
}
else if(gameState==="bullet"){
  textSize(50)
  fill("red")
  text("You ran out of bullets.",400,400)
  zombiesGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()

}
}

function enemy(){
  if(frameCount%50===0){  
  
zombie= createSprite(random(500,1100),random(400,650))
 zombie.addImage(zombieImg)
  zombie.scale= 0.2
  zombie.velocityX= -2
  zombie.debug= true
  zombie.setCollider ("rectangle",0,0,300,300)
  zombie.lifetime= 400
  zombiesGroup.add(zombie)
  
  }
}