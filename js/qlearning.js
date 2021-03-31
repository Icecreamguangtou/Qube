
var ifstop=false;

var interval = 1;
//Value of Gamma or Discount Rate
var gamma = 1;

var learnRate = 0.5;

var drawfinalpath=false;
//Epsilon for greedy probability
///var epsilon = 0.05;


var pitvalue=-1;
var goalvalue=1;


var pitrange=3;

var circlecount=0;



window.onload=function(){
  
document.getElementById("myRange").addEventListener("input", function() { sliderChange(this.value) });

document.getElementById("gamma").addEventListener('input', function () {getGamma(this.value) });

document.getElementById("learn").addEventListener('input', function () {getLearn(this.value) });


document.getElementById("pitvalue").addEventListener('input', function () {getPitvalue(this.value) });

document.getElementById("goalvalue").addEventListener('input', function () {getGoalvalue(this.value) });

document.getElementById("pitrange").addEventListener("change", function () {getRange(this.value) });




}

function sliderChange(val) {
  //console.log("dddd");
//document.getElementById('demo').innerHTML = val;
//console.log(val);
interval=val;
//clearInterval(idInterval);
 clearInterval(idInterval);
  idInterval = setInterval(randomMove,interval);
console.log(interval);
}


function getGamma(val) {
gamma=val;
//console.log(gamma);
}


function getLearn(val) {
learnRate=val;
//console.log(learnRate);
}



function getPitvalue(val) {
pitvalue=val;
//console.log(pitvalue);

}



function getGoalvalue(val) {
goalvalue=val;
//console.log(goalvalue);
}

function getRange(val) {
pitrange=val;
//console.log(pitrange);
}





//var starttime;
//var endtime;
var totaltime;

  
  /*$(function(){
    
    $('#speed').slider({
  onChange: function(newValue, oldValue){
    interval=newValue; 
    console.log(newValue);
    console.log(interval);
  
  }
});

  });*/
    
//START Variable//
var idInterval = null;
var tileNow = [-1,-1];

var finalPathArray=[[0,0]];
var finalPathArrayTemp=[];

var startfinalpath=false;
var finalPathCounter=0;

var counter = 0;
var state = [];
var dx = [1,0,-1,0];
var dy = [0,-1,0,1];

var numberAttempt = 0;
var dir = ['right','down','left','up'];



//END Variable//




//Obstacle Array
var obstacle = [];
//DEFINE Pit Coordinate


var pit = [[3,3]];
var pitoriginal=[[3,3]];

var tileStart=[0,0];


//Define Tile Goal
var tileEnd   = [4,6];

//MAP SIZE
var MAP_X = 10;
var MAP_Y = 10;

//set debugMode to True for displaying Q Value[might reduce performance]
var debugMode = true;


   


var Qtablearr = new Array();
for(var i = 0; i < MAP_X; i++){
Qtablearr[i] = new Array();
for(var j = 0; j < MAP_Y; j++){
Qtablearr[i][j] = new Array();
for(var k = 0; k < 4; k++){
Qtablearr[i][j][k] = 0;
}
}
}




//2d array for maze
function make2Darray(MAP_X, MAP_Y) {
  var arr = new Array(MAP_X);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(MAP_Y);
  }
  return arr;
}


// Sketch Qtable
var t = function( p ) {  

  p.setup = function() {
    p.createCanvas(501, 501);
   


     p.colors = make2Darray(MAP_X, MAP_Y); 
     //console.log(p.triangleindex[2][2][3]);
     for (var i = 0; i < MAP_X; i++) {
      for (var j = 0; j < MAP_Y; j++) { 
      p.colors[i][j] = 255;
      }
     }

    p.triangleindex=make2Darray(MAP_X, MAP_Y);
     for(var i=0;i<MAP_X;i++)
     {
      for (var j = 0; j < MAP_Y; j++) {
        p.triangleindex[i][j]=[0,0,0,0];
         //console.log(p.triangleindex[i][j][3]);
      }

     }  
    for(var i=0;i<MAP_X;i++)
     {
      for (var j = 0; j < MAP_Y; j++) {

       

        for(z=0;z<4;z++){
        p.triangleindex[i][j][z]=p.color(255, 204, 100,0);
        //console.log(p.triangleindex[i][j][z]);
      }
       //console.log(p.triangleindex[i][j][3]);
      }
     }  
   

  };

 

  p.draw = function() {
    p.background(255);
   
   //console.log("bbb");

      for (var i = 0; i < MAP_X; i++) {
      for (var j = 0; j < MAP_Y; j++) {  

        p.textSize(7);
         p.fill(0);
         p.text(Qtablearr[i][j][0], i*50+31, j*50+27);
         p.text(Qtablearr[i][j][1], i*50+15, j*50+45);
        p.text(Qtablearr[i][j][2], i*50+1, j*50+27);
        p.text(Qtablearr[i][j][3],  i*50+15, j*50+12);

         for (var z=0;z<4;z++){

         p.push(); 
         
         
         p.translate(25+i*50,25+j*50); 
         p.fill(p.triangleindex[i][j][z]);  
         p.stroke(0,0,0,50);

         p.rotate(z*p.PI/2);
         p.triangle(0, 0, 25, 25, 25, -25);

         p.pop();
        

}    
}
}
     

for (var i=0; i<4;i++)
{
  p.triangleindex[tileStart[0]][tileStart[1]][i]= p.color(0, 219, 112, 155);

}

for (var i=0; i<4;i++)

{
   p.triangleindex[tileEnd[0]][tileEnd[1]][i]= p.color(0, 126, 255, 155);

}

  

       for (var i=0; i<pit.length;i++)
  {
    p.triangleindex[pit[i][0]][pit[i][1]][0]= p.color(255,255,0, 155);
     p.triangleindex[pit[i][0]][pit[i][1]][1]= p.color(255,255,0, 155);
      p.triangleindex[pit[i][0]][pit[i][1]][2]= p.color(255,255,0, 155);
       p.triangleindex[pit[i][0]][pit[i][1]][3]= p.color(255,255,0, 155);

}



       for (var i=0; i<obstacle.length;i++)
  {
    p.triangleindex[obstacle[i][0]][obstacle[i][1]][0]= p.color(2, 2, 2, 225);
     p.triangleindex[obstacle[i][0]][obstacle[i][1]][1]= p.color(2, 2, 2, 225);
      p.triangleindex[obstacle[i][0]][obstacle[i][1]][2]= p.color(2, 2, 2, 225);
       p.triangleindex[obstacle[i][0]][obstacle[i][1]][3]= p.color(2, 2, 2, 225);

}


 
  





 for (var i = 0; i < MAP_X; i++) {
    for (var j = 0; j < MAP_Y; j++) {
      var x = i * 50+19.5 ;
      var y = j * 50+19.5;
    //  console.log(p.colors[i][j]);
      p.fill(p.colors[i][j]);
      p.stroke(0,0,0,50);
      p.rect(x, y, 10, 10);

     // p.stroke(255,255,255,0);
    }
  }
   p.colors[tileStart[0]][tileStart[1]]= p.color(0, 219, 112, 255);
   //console.log("aaa");
   p.colors[tileEnd[0]][tileEnd[1]]= p.color(0, 126, 255, 255);


   for (var i=0; i<pit.length;i++)
  {
  p.colors[pit[i][0]][pit[i][1]]= p.color(255,255,0, 255);}



  for (var i=0; i<obstacle.length;i++)
  {
  p.colors[obstacle[i][0]][obstacle[i][1]]= 2;}





 //console.log("The value of x is " + p.mouseX);
var renumberX=Math.ceil(p.mouseX/50);
//console.log("The recx number is"+ renumberX);

var directionX=Math.ceil(p.mouseX/12.5);
//console.log("The diectioX number is"+ directionX);

 //console.log("The value of y is " + p.mouseY);

var renumberY=Math.ceil(p.mouseY/50);
//console.log("The recY number is"+ renumberY);

var directionY=Math.ceil(p.mouseY/12.5);
//console.log("The diectioY number is"+ directionY);

if(renumberX>0&&renumberX<11&&renumberY>0&&renumberY<11)
{

  //console.log("The recX number is"+ renumberX);
 //console.log("The recY number is"+ renumberY);

if(directionX%4==0)
   {//console.log("left");
    document.getElementById("popup").innerHTML = Qtablearr[renumberX-1][renumberY-1][0];
    document.getElementById('popup').style.display = 'block';}

else if((directionX-1)%4==0)
  {//console.log("right");
    document.getElementById("popup").innerHTML = Qtablearr[renumberX-1][renumberY-1][2];
    document.getElementById('popup').style.display = 'block';}

else
  {
    if(directionY%4==0)
     { //console.log("down");
   document.getElementById("popup").innerHTML = Qtablearr[renumberX-1][renumberY-1][1];
    document.getElementById('popup').style.display = 'block';}

    else if ((directionY-1)%4==0)
      {//console.log("up");
       document.getElementById("popup").innerHTML = Qtablearr[renumberX-1][renumberY-1][3];
       document.getElementById('popup').style.display = 'block';}
    else 
    {  //console.log("center");
      document.getElementById('popup').style.display = 'none';}
  }

}
else
{ //console.log("Out");
    document.getElementById('popup').style.display = 'none';}
 
 
}; 



};
var Qtable = new p5(t, 'Qtable');


var testifpitbool=false;


//draw maze
var s = function( p ) { // p could be any variable name
  p.setup = function() {
    p.createCanvas(501, 501);

     p.colors = make2Darray(MAP_X, MAP_Y);
        for (var i = 0; i < MAP_X; i++) {
        for (var j = 0; j < MAP_Y; j++) {
         p.colors[i][j] = 255;

        }
        }

  };

  p.draw = function() {
    p.background(255);

 
    for (var i = 0; i < MAP_X; i++) {
    for (var j = 0; j < MAP_Y; j++) {
      var x = i * 50;
      var y = j * 50;
      p.fill(p.colors[i][j]);
      //p.stroke(0);
      p.rect(x, y, 50, 50);      

    }
  }


   


  //entrance and exit and reward
  p.colors[tileStart[0]][tileStart[1]]= p.color(0, 219, 112, 147);


  p.colors[tileEnd[0]][tileEnd[1]]= p.color(0, 126, 255, 255);

  for (var i=0; i<pit.length;i++)
  {
  p.colors[pit[i][0]][pit[i][1]]= p.color(255,255,0, 255);}


   for (var i=0; i<obstacle.length;i++)
  {
  p.colors[obstacle[i][0]][obstacle[i][1]]= 2;}

  


  };



  //draw a wall/press location transfer to 
p.mousePressed=function() {
//console.log("The value of x is " + p.mouseX);
var renumberX=Math.ceil(p.mouseX/50);
//console.log("The recx number is"+ renumberX);

//console.log("The value of y is " + p.mouseY);
var renumberY=Math.ceil(p.mouseY/50);
//console.log("The recY number is"+ renumberY);



if ( document.getElementById("wallcheck").checked == true){


if(0<renumberX<51&&0<renumberY<51){//panduan you wen ti
  if (p.colors[renumberX-1][renumberY-1] == 255)
  {
     //console.log("1");
    p.colors[renumberX-1][renumberY-1] =2;
    Qtable.colors[renumberX-1][renumberY-1] =2;
    for(z=0;z<4;z++){
    	Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(2, 2, 2, 225);
    }
    var x = renumberX-1;
 
    var y = renumberY-1;
   
    obstacle.push([x,y]);
  
  }


    
  else if(p.colors[renumberX-1][renumberY-1] == 2)
    {
      //console.log("2");
      p.colors[renumberX-1][renumberY-1] =255;

      //console.log( p.colors[renumberX-1][renumberY-1] );
  	  Qtable.colors[renumberX-1][renumberY-1] =255;

  	  for(z=0;z<4;z++){
    	  Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(255,255,255,0);
        }
      removeWall(renumberX-1,renumberY-1);
     
  } 
}


}

if(document.getElementById("pitcheck").checked == true){



if(0<renumberX<51&&0<renumberY<51)
 { 
  if (p.colors[renumberX-1][renumberY-1] == 255)
  {
     //console.log("1");

    p.colors[renumberX-1][renumberY-1] =p.color(255,255,0, 255);
 // Load the image
    
   // console.log( p.colors[renumberX-1][renumberY-1].levels[0]);
    // console.log( p.colors[renumberX-1][renumberY-1].levels[1]);
    //  console.log( p.colors[renumberX-1][renumberY-1].levels[2]);
     //  console.log( p.colors[renumberX-1][renumberY-1].levels[3]);

    //console.log( p.colors[renumberX-1][renumberY-1]);
    Qtable.colors[renumberX-1][renumberY-1] =p.color(255,255,0, 255);
    for(z=0;z<4;z++){
      Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(255,255,0, 255);
    }
    var x = renumberX-1;
 
    var y = renumberY-1;
   
    pit.push([x,y]);

     pitoriginal.push([x,y]);
     //pitoriginal=pit;

  
  }
   

   else if (p.colors[renumberX-1][renumberY-1] != 255)
   {


   for(var i=0; i<pit.length; i++)

   {

       if( (renumberX-1)==pit[i][0]&& (renumberY-1)==pit[i][1]  )

        {


         p.colors[renumberX-1][renumberY-1] =255;
          Qtable.colors[renumberX-1][renumberY-1] =255;
         for(z=0;z<4;z++){
            Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(255,255,255,0);
          }
           removePit(renumberX-1,renumberY-1);
           removePitoriginal(renumberX-1,renumberY-1);

      
        }


   }
 }
    
}
}

var tempstart=[];

if(document.getElementById("startcheck").checked == true){



if(0<renumberX<51&&0<renumberY<51)
 { 


  if (p.colors[renumberX-1][renumberY-1] == 255)
  {

    tempstart=tileStart;
     

    window.tileStart=[renumberX-1,renumberY-1];
    // alert(tileStart);
   // initiate();

    
  tileNow[0] = tileStart[0];
  tileNow[1] = tileStart[1];



     p.colors[renumberX-1][renumberY-1] =p.color(0, 219, 112, 147);
     Qtable.colors[renumberX-1][renumberY-1] =p.color(0, 219, 112, 147);
      for(z=0;z<4;z++){
            Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(0, 219, 112, 147);
          }

       p.colors[ tempstart[0]][ tempstart[1]] =255;
     Qtable.colors[ tempstart[0]][ tempstart[1]] =255;
      for(z=0;z<4;z++){
            Qtable.triangleindex[ tempstart[0]][ tempstart[1]][z] =255;
          }

     
  
  }
   

   else if (p.colors[renumberX-1][renumberY-1] != 255)
   {


     console.log("dsads");
 }
    
}
}



var tempend=[];

if(document.getElementById("goalcheck").checked == true){



if(0<renumberX<51&&0<renumberY<51)
 { 


  if (p.colors[renumberX-1][renumberY-1] == 255)
  {

    tempend=tileEnd;
     

    window.tileEnd=[renumberX-1,renumberY-1];
     //alert(tileStart);
     //initiate();

     p.colors[renumberX-1][renumberY-1] =p.color(0, 126, 255, 255);
     Qtable.colors[renumberX-1][renumberY-1] =p.color(0, 126, 255, 255);
      for(z=0;z<4;z++){
            Qtable.triangleindex[renumberX-1][renumberY-1][z] =p.color(0, 126, 255, 255);
          }

       p.colors[ tempend[0]][ tempend[1]] =255;
     Qtable.colors[ tempend[0]][ tempend[1]] =255;
      for(z=0;z<4;z++){
            Qtable.triangleindex[ tempend[0]][ tempend[1]][z] =255;
          }

     
  
  }
   

   else if (p.colors[renumberX-1][renumberY-1] != 255)
   {


     console.log("dsads");
 }
    
}
}





};







};
var MyCanvas = new p5(s, 'MyCanvas');








function defineState(){
  //Define initial state
  for(var x=0;x<MAP_X;x++){
    for(var y=0;y<MAP_Y;y++){
      var innerState = {"x":x,"y":y};
      for(var k=0;k<4;k++){
        innerState[dir[k]] = 0;
      }
      state.push(innerState);
    }
  }
}


  //alert("beforeinitiatestart"+tileStart);
function initiate(){

  tileNow[0] = tileStart[0];
  tileNow[1] = tileStart[1];
/*

var img1=document.getElementById("meetg");
 /*img1.style.display="none";*/

         
  move(tileStart,true);



 // alert("initiatestart"+tileStart);
  //move(tileEnd,true);
  for (var i=0; i<pit.length;i++)
   {
    MyCanvas.colors[pit[i][0]][pit[i][1]]= MyCanvas.color(255,255,0, 255);
  }





 for (var i=0; i<pit.length;i++)
{
  Qtable.colors[pit[i][0]][pit[i][1]]= Qtable.color(255,255,0, 255);
Qtable.triangleindex[pit[i][0]][pit[i][1]][0]= Qtable.color(255,255,0, 255);
Qtable.triangleindex[pit[i][0]][pit[i][1]][1]= Qtable.color(255,255,0, 255);
Qtable.triangleindex[pit[i][0]][pit[i][1]][2]= Qtable.color(255,255,0, 255);
Qtable.triangleindex[pit[i][0]][pit[i][1]][3]= Qtable.color(255,255,0, 255);

}



 MyCanvas.colors[tileEnd [0]][tileEnd [1]]= MyCanvas.color(0, 126, 255, 255);
 /* MyCanvas.colors[tileStart[0]][tileStart[1]]= MyCanvas.color(0, 219, 112, 147);*/


 Qtable.colors[tileEnd [0]][tileEnd [1]]= Qtable.color(0, 126, 255, 255);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][0]= Qtable.color(0, 126, 255, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][1]= Qtable.color(0, 126, 255, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][2]= Qtable.color(0, 126, 255, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][3]= Qtable.color(0, 126, 255, 155);


/*
 Qtable.colors[tileStart [0]][tileStart [1]]= Qtable.color(0, 126, 255, 255);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][0]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][1]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][2]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][3]= Qtable.color(0, 219, 112, 155);*/


 // $("[x="+pit[0]+"][y="+pit[1]+"]").css({"backgroundColor":"red"});
  //$("[x="+tileEnd [0]+"][y="+tileEnd [1]+"]").css({"backgroundColor":"green"});
}

var pittemp=[0,0];

function move(mov,isFoward){
  //Coloring tiles isFoward (move to the next tile)
  //$("[x="+mov[0]+"][y="+mov[1]+"]").css({"backgroundColor":(isFoward)?"green":"white"});
MyCanvas.colors[tileStart[0]][tileStart[1]]= MyCanvas.color(0, 219, 112, 147);
/*MyCanvas.colors[tileEnd [0]][tileEnd [1]]= MyCanvas.color(0, 126, 255, 255);*/


 /*Qtable.colors[tileEnd [0]][tileEnd [1]]= Qtable.color(0, 126, 255, 255);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][0]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][1]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][2]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileEnd [0]][tileEnd [1]][3]= Qtable.color(0, 219, 112, 155);*/

  Qtable.colors[tileStart [0]][tileStart [1]]= Qtable.color(0, 219, 112, 147);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][0]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][1]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][2]= Qtable.color(0, 219, 112, 155);
 Qtable.triangleindex[tileStart [0]][tileStart [1]][3]= Qtable.color(0, 219, 112, 155);



if (isFoward)
{
  MyCanvas.colors[mov[0]][mov[1]] =MyCanvas.color(220,20,60);
  Qtable.colors[mov[0]][mov[1]] =Qtable.color(220,20,60);

// Math.floor(Math.random() * (max - min + 1)) + min; 


  if(pitrange!=0){

   for(var i=0;i<pit.length;i++)
   {
       
       var xory= Math.floor(Math.random() * 2);
       var absxory=Math.abs(xory-1);

      pittemp[xory]=Math.floor(Math.random() * 3+ pit[i][xory]-1);
      pittemp[absxory]=pit[i][absxory];

      var abspito= Math.abs(pittemp[0]-pitoriginal[i][0]) + Math.abs(pittemp[1] - pitoriginal[i][1]);

       //alert("xory"+xory+" absxory"+absxory+"i:"+i+"pittemp:"+pittemp+"abspito:"+abspito);
       
     //  alert("pittemp:"+pittemp);
      //alert("abspito"+abspito+"i:"+i);

    
      
      if (!isInArray(pittemp))
      {  
        if(abspito<pitrange)
        {
           // console.log(pitrange);
           
        if(pittemp[0]<10&&pittemp[0]>-1&&pittemp[1]<10&&pittemp[1]>-1) 

        {
          if(pittemp[0]!=tileStart[0]&&pittemp[1]!=tileStart[1]&&pittemp[0]!=tileEnd[0]&&pittemp[1]!=tileEnd[1])
          {
              

            pit[i][xory]=pittemp[xory];
           // pit[i][1]=pittemp[1];
          

        }
        }
      }
    }
    
   
  // console.log(i+"pitforward"+pit[i]);
 //   console.log(i+"pitforward"+pitoriginal[i]);
  }
  
 
   
for(var i=0;i<pit.length;i++)
   {
    
   MyCanvas.colors[pit[i][0]][pit[i][1]]=MyCanvas.color(255,255,0, 255);
   Qtable.colors[pit[i][0]][pit[i][1]]= Qtable.color(255,255,0, 255);
   Qtable.triangleindex[pit[i][0]][pit[i][1]][0]= Qtable.color(255,255,0, 255);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][1]= Qtable.color(255,255,0, 255);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][2]= Qtable.color(255,255,0, 255);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][3]= Qtable.color(255,255,0, 255);
 
  }

}

}

else

{
  MyCanvas.colors[mov[0]][mov[1]] =255;
  Qtable.colors[mov[0]][mov[1]] =255;
  //console.log("pitelse"+pit);


  if(pitrange!=0){

 for(var i=0;i<pit.length;i++)
   { 

    
MyCanvas.colors[pit[i][0]][pit[i][1]]=255;
   Qtable.colors[pit[i][0]][pit[i][1]]= 255;
   Qtable.triangleindex[pit[i][0]][pit[i][1]][0]= Qtable.color(255,255,255,0);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][1]= Qtable.color(255,255,255,0);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][2]= Qtable.color(255,255,255,0);
    Qtable.triangleindex[pit[i][0]][pit[i][1]][3]= Qtable.color(255,255,255,0);
 
  }
}

}


}

function isInArray(move){
  //Check if "MOVE" is in obstacle array
  var ok = false;
  for(var i = 0;i<obstacle.length;i++){
    if( (obstacle[i][0] == move[0]) && (obstacle[i][1] == move[1]) ){
      ok = true;
      break;
    }
  }
  return ok;
}




function getQ(tileNow){
   
  //Get current state
  for(var i =0;i<state.length;i++){
    if( (state[i].x == tileNow[0]) && (state[i].y == tileNow[1]) )
    {
      return state[i]; 
      

    }
         

  }

  
}

function randomMove(){

if(!ifstop){

  var highestQValue = -123123;
  var moveX,moveY;
  var nowQ = getQ(tileNow);



  counter++;
  var goalState = getQ(tileEnd);

  var pitState =[];


   //console.log(pit);

for (var i=0; i<pit.length;i++)
 { pitState[i]= getQ(pit[i]);}



  counter++;
  for(var i =0;i<4;i++){

   
    var Qnow = nowQ[dir[i]];
       

    if(highestQValue < Qnow){
      highestQValue = Qnow;
      //console.log("Qnow"+Qnow);
      dr = dir[i];
    }
  }
  
  if(dr == 'up'){
    moveX = tileNow[0] + 0;
    moveY = tileNow[1] - 1;
  }
  else if(dr == 'down'){
    moveX = tileNow[0] + 0;
    moveY = tileNow[1] + 1;
  }
  else if(dr == 'left'){
    moveX = tileNow[0] - 1;
    moveY = tileNow[1];
  }
  else
  {
    moveX = tileNow[0] + 1;
    moveY = tileNow[1];
  }
  var nextQ = -123123;
  if(moveX >= 0 && moveX < MAP_X && moveY >= 0 && moveY < MAP_Y){
    if(!isInArray([moveX,moveY])){
      var nextState = getQ([moveX,moveY]);
      for(var i =0;i<4;i++){
        var Q = nextState[dir[i]];
        nextQ = Math.max(nextQ,Q);
      }
      var reward = -0.04;
      nowQ[dr] = nowQ[dr] + ( learnRate * ( reward + gamma * nextQ - nowQ[dr]) );///0.5!!!
      move(tileNow,false);
      tileNow[0] = moveX;
      tileNow[1] = moveY;
      move(tileNow,true);
      if(moveX == tileEnd[0] && moveY == tileEnd[1]){
            meetgoal(moveX,moveY);
        for(var i=0;i<4;i++){
          goalState[dir[i]] = goalState[dir[i]] + ( learnRate * ( goalvalue - goalState[dir[i]]) );
        }
        move(tileNow,false);
      initiate();
        idInterval = setInterval(randomMove,interval);
      }

      for (var j=0; j<pit.length;j++){
       if(moveX == pit[j][0] && moveY == pit[j][1]){
         meetghost(moveX,moveY);
        //MyCanvas.colors[moveX][moveY]= MyCanvas.color(255, 165, 0, 255);
        for(var i=0;i<4;i++){
          pitState[j][dir[i]] = pitState[j][dir[i]] + ( learnRate * ( pitvalue - pitState[j][dir[i]]) );
        }
        

       //MyCanvas.colors[moveX][moveY]= MyCanvas.color(255, 165, 0, 255);
        //alert(moveX+moveY);
        move(tileNow,false);
        initiate();
       idInterval = setInterval(randomMove,interval);
      }

       }

  

    }
    else
    {
      var reward = -0.04;
      nowQ[dr] = nowQ[dr] + reward;
    }
  }
  else
  {
    var reward = -0.04;
    nowQ[dr] = nowQ[dr] + reward;
  }
  if(debugMode) debugQ();

}


}

var tileStartdifferenceCount=0;

function debugQ(){
  //$('#q').html('');
  for(var y=0;y<MAP_Y;y++){
    for(var x=0;x<MAP_X;x++){
     // $("[x="+x+"][y="+y+"]").html('');
      var state = getQ([x,y]);
      var dir = ['right','down','left','up'];
      for(var k=0;k<4;k++){
        //$("[x="+x+"][y="+y+"]").append(dir[k] + ':' + Math.round(state[dir[k]] * 100) / 100 + '<br/>'); 
         Qtablearr[x][y][k]=Math.round(state[dir[k]] * 100) / 100 ;

         var difference=Qtablearr[x][y][k]-0;
   

         if(difference<0)//减少

          { 
            
            Qtable.triangleindex[x][y][k]= Qtable.color(220,20,60, (-difference)*100+10);
          

          }

          else if(difference>0)//增加

          { 
            
            Qtable.triangleindex[x][y][k]= Qtable.color(0, 126, 255, difference*100+10);

              

              
                   
                // alert("debugQbefore==100"+tileStart);
              if(x==tileStart[0]&&y==tileStart[1])
              {  
                
               

                if(tileStartdifferenceCount==100)//
                {  

                    //console.log(idInterval);
                       

                       //endtime= new Date().getTime();
                       //console.log("endtime"+endtime);
                       //console.log(endtime-starttimm);


                   drawfinalpath=true;
                   

                   if(drawfinalpath)
                    drawfinal();

                 
                }



                else
                  {

                    tileStartdifferenceCount++;
                  //console.log(tileStartdifferenceCount);
            

                  }
                  //console.log(tileStartdifferenceCount);}
              }
             
          }


           else if(difference=0)

          { 
            
            Qtable.triangleindex[x][y][k]= 255;

          }
            }




      }
    }
}


var temppointx=0;//temp
var temppointy=0;
var endpointx=0;
var endpointy=0;
var breakornot=true;





function drawfinal(){
var c = document.getElementById("FinalPath");
var ctx = c.getContext("2d");

var gradient=ctx.createLinearGradient(0,0,c.width,0);

var popup1= document.getElementById("popupformeet");
var introductionsnap= document.getElementById("introductionsnap");

gradient.addColorStop("0","blue");
gradient.addColorStop("0.5","green");
gradient.addColorStop("1","purple");
//console.log("drawfinal");

  if (tileNow[0]==tileStart[0]&&tileNow[1]==tileStart[1])
  {
        finalPathCounter++;
        //console.log(finalPathCounter);
      
     
  }

   


  if (finalPathCounter==1)

   { 

  
     //endtime= new Date().getTime();

      //totaltime=(endtime-starttime)/1000+"secs";

    //console.log(totaltime);
    totaltime=circlecount+"rounds";
    
    console.log(circlecount);

    //document.getElementById("totaltime").innerHTML=totaltime;
      
    
//Always check for properties and methods, to make sure your code doesn't break in other browsers.
popup1.style.display = 'block';      
 popup1.innerHTML='Total rounds:'+totaltime;

 introductionsnap.style.display='block';
 introductionsnap.innerHTML='Click'+ ' '+ '<img src=\'img/snapicon.jpg\'  id=\'snapintro\'>'+' '+ ' to take a screenshot of the maze; Click'+' '+ '<img src=\'img/again.png\'  id=\'againintro\'>'+' '+'to re-start again';

      //console.log("hhhhhh!");


      endpointx=tileNow[0];
     endpointy=tileNow[1]; 


        if (tileStart[0]==0&&tileStart[1]==0)

        {

           
           console.log("1::::::::::::"+temppointx+" "+temppointy+" "+endpointx+" "+endpointy);
          

            ctx.beginPath();
            ctx.moveTo(25+temppointx*50, 25+temppointy*50);
            ctx.lineTo(25+endpointx*50, 25+endpointy*50);

// Fill with gradient
             ctx.strokeStyle=gradient;
             ctx.lineWidth=5;
          ctx.stroke();

        }



        else{

           
  
         if (temppointx!=0||temppointy!=0)
         {
            console.log("2::::::::::::"+temppointx+" "+temppointy+" "+endpointx+" "+endpointy);
          


            ctx.beginPath();
            ctx.moveTo(25+temppointx*50, 25+temppointy*50);
            ctx.lineTo(25+endpointx*50, 25+endpointy*50);

// Fill with gradient
             ctx.strokeStyle=gradient;
             ctx.lineWidth=5;
          ctx.stroke();
              

         }


       }

    

     temppointx=endpointx;
     temppointy=endpointy;
     
    
   }



   else if (finalPathCounter>1)
   {


   // console.log("finalPathCounter>1::::::::::"+temppointx+" "+temppointy+" "+endpointx+" "+endpointy);
         // console.timeEnd("concatenation");

            ctx.beginPath();
            ctx.moveTo(25+endpointx*50, 25+endpointy*50);
            ctx.lineTo(25+tileEnd[0]*50, 25+tileEnd[1]*50);

// Fill with gradient
             ctx.strokeStyle=gradient;
             ctx.lineWidth=5;
          ctx.stroke();

          stop();

   }







}


var ok = false;

function stop(){

  

 

  ifstop=true;
  clearInterval(idInterval);
  document.getElementById('start').style.display="block";
    document.getElementById('stop').style.display="none";




}

function start(){
  //starttime= new Date().getTime();
  //console.log("starttime"+starttime);
  //console.time("concatenation");


  ifstop=false;
  clearInterval(idInterval);
  idInterval = setInterval(randomMove,interval);
  document.getElementById('start').style.display="none";
    document.getElementById('stop').style.display="block";

}



function again(){



 ifstop=true;


window.idInterval = null;
window.tileNow = [-1,-1];

window.finalPathArray=[[0,0]];
window.finalPathArrayTemp=[];

window.startfinalpath=false;
window.finalPathCounter=0;

window.counter = 0;

window.dx = [1,0,-1,0];
window.dy = [0,-1,0,1];

window.numberAttempt = 0;

window.temppointx=0;//temp
window.temppointy=0;
window.endpointx=0;
window.endpointy=0;
window.totaltime=0;


 window.state=[];

 window.circlecount=0;

  

for(var i = 0; i < MAP_X; i++){

  for(var j = 0; j < MAP_Y; j++){
 for(var k = 0; k < 4; k++){

Qtablearr[i][j][k] = 0;
}
}
}


for(var i = 0; i < MAP_X; i++){

  for(var j = 0; j < MAP_Y; j++){
 for(var k = 0; k < 4; k++){

Qtable.triangleindex[i][j][k]= Qtable.color(255,255,255,0);
}
}
}


for(var i = 0; i < MAP_X; i++){

  for(var j = 0; j < MAP_Y; j++){
 

Qtable.colors[i][j]= 255;

}
}


for(var i = 0; i < MAP_X; i++){

  for(var j = 0; j < MAP_Y; j++){

MyCanvas.colors[i][j]= 255;

}
}

var c = document.getElementById("FinalPath");
var ctx = c.getContext("2d");
ctx.clearRect(0, 0, 501, 501);

var popup1= document.getElementById("popupformeet");
popup1.style.display="none";


var introductionsnap= document.getElementById("introductionsnap");
introductionsnap.style.display="none";

defineState();
initiate();




   clearInterval(idInterval);
  document.getElementById('start').style.display="block";
    document.getElementById('stop').style.display="none";

}






function createTable(){
  for(var i=0;i<MAP_Y;i++){
    var html = '<tr>';
    for(var j=0;j<MAP_X;j++){
      html += '<td x="'+j+'" y="'+i+'"></td>';
    }
    html += '</tr>';
    $('#table').append(html);
  }
}
$(document).ready(function(){

  createTable();
  defineState();
  initiate(); 



  /*$('td').click(function(){
    var x = $(this).attr("x");
    var y = $(this).attr("y");
    obstacle.push([x,y]);
    $(this).css({"backgroundColor":"black"});
  });*/

  /*$("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
       randomMove("left");
    }
    else if(e.keyCode == 39) { // right
        randomMove("right");
    }
    else if(e.keyCode == 38){ // UP
        randomMove("up");
    }
    else if(e.keyCode == 40){//DOWN
      randomMove("down");
    }
  });*/

});

   


function removeWall(x,y){

	for ( var i = 0; i <  obstacle.length; i++) {
    var arrx = ""+x;
     var arry = ""+y;

    if(arrx== obstacle[i][0]&& arry== obstacle[i][1]){
    	   obstacle.splice(i, 1);
    	  return false;
    }
  
  }
}

var removePitiii;


function removePit(x,y){

  for ( var i = 0; i <  pit.length; i++) {
    var arrx = ""+x;
     var arry = ""+y;

    if(arrx== pit[i][0]&& arry== pit[i][1]){
      removePitiii=i;
        pit.splice(i, 1);
        return false;
    }
  
  }
}


function removePitoriginal(x,y){

  /*for ( var i = 0; i <  pitoriginal.length; i++) {
    var arrx = ""+x;
     var arry = ""+y;

    if(arrx== pitoriginal[i][0]&& arry== pitoriginal[i][1]){
         pitoriginal.splice(i, 1);
        return false;
    }
  
  }*/

   pitoriginal.splice(removePitiii, 1);
        return false;
}


function meetghost(x,y) {


          

  var img1=document.getElementById("meetg");
 // var popup1= document.getElementById("popupformeet");
         

          var margx= x*50 +100 ;
          var margy= y*50 -20;
          //console.log(margx+"ddddd"+margy);
          img1.style.display="block";
         
         img1.style.marginLeft = margx+'px ';
         img1.style.marginTop = margy+'px ';

/*
   popup1.innerHTML = "Opps! The agent meets the ghost";
  popup1.style.display = "block";

    popup1.classList.toggle('fade');     */
     /* img1.classList.toggle('fade');



/*
  img1.style.opacity = "0.9";
img1.style.filter = 'alpha(opacity=90)';*/

         //img1.style.marginLeft = "margx";

         //img1.style.marginTop = "";
        
 /* var c = document.getElementById("DrawImg");
var ctx = c.getContext("2d");


   
        //Loading of the home test image - img1
        var img1 = new Image();

        //drawing of the test image - img1
        img1.onload = function () {
            //draw background image
            ctx.drawImage(img1, x*50, y*50);

        };

        img1.src = 'img/meetg.png';*/
 
 
 /*setTimeout(function (){
ctx.clearRect(0, 0, 501, 501);

}, 50);*/
setTimeout(function (){
 img1.style.display="none";


}, 10);

    
}


function meetgoal(x,y) {      

  var img1=document.getElementById("findg");
    //var popup1= document.getElementById("popupformeet");
         console.log(x+y);

          var margx= x*50 +100 ;
          var margy= y*50 -17;
          //console.log(margx+"ddddd"+margy);
          circlecount++;
          img1.style.display="block";

         
         img1.style.marginLeft = margx+'px ';
         img1.style.marginTop = margy+'px ';

/*
   popup1.innerHTML = "Yeah! Then agent arrives the goal position";
  popup1.style.display = "block";
popup1.classList.toggle('fade');*/

setTimeout(function (){
 img1.style.display="none";
  //popup1.style.display = 'none';


}, 10);

    
}








 