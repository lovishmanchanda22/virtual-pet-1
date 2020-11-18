var dog, happydog, database, foods, fodstock;
var d1, d2;

function preload()
{
  d1 = loadImage("images/dogimg1.png");
  d2 = loadImage("images/dogimg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(d1);
  dog.scale = 0.5;

  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(d2);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  strokeWeight(4);
  stroke("lightblue");
  text("Note: Press UP ARROW key to Feed Drago Milk.",40,30);
  text("Food Left: "+foods,20,200);

}

function readStock(data){
  foods = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



