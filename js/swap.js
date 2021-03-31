function SwapDivsWithClick(div1,div2)
{
   d1 = document.getElementById(div1);
   d2 = document.getElementById(div2);

   //console.log("ddddd");

      d1.style.display = "block";
      d2.style.display = "none";

}






$(function(){

  
    
$("#wallcheck").on('change', function(e) {

  if ($(this).is(':checked')) {
  $("#introduction").css("display", "block");
  $("#introduction").text("Click grid in Maze to set walls, click again to remove the wall");
        $("#pitcheck").prop('checked', false);
        $("#startcheck").prop('checked', false);
        $("#goalcheck").prop('checked', false);
   } 

  else{
   $("#introduction").css("display", "none");

  }


});



$("#pitcheck").on('change', function(e) {
   if ($(this).is(':checked')) {
     $("#introduction").css("display", "block");
  $("#introduction").text("Click grid in Maze to set ghosts, click again to remove");
        $("#wallcheck").prop('checked', false);
        $("#startcheck").prop('checked', false);
        $("#goalcheck").prop('checked', false);
   } 

    else{
   $("#introduction").css("display", "none");

  }
});


$("#startcheck").on('change', function(e) {
   if ($(this).is(':checked')) {
     $("#introduction").css("display", "block");
  $("#introduction").text("Click grid in Maze to choose start position.");
        $("#pitcheck").prop('checked', false);
        $("#wallcheck").prop('checked', false);
        $("#goalcheck").prop('checked', false);
   } 

    else{
   $("#introduction").css("display", "none");

  }
});


$("#goalcheck").on('change', function(e) {
   if ($(this).is(':checked')) {
       $("#introduction").css("display", "block");
  $("#introduction").text("Click grid in Maze to choose goal position.");
        $("#pitcheck").prop('checked', false);
         $("#wallcheck").prop('checked', false);
        $("#startcheck").prop('checked', false);
   } 


    else{
   $("#introduction").css("display", "none");

  }
});



 $("#start").click(function(e){
  $("#introduction").css("display", "none");
         $("#pitcheck").prop('checked', false);
         $("#wallcheck").prop('checked', false);
        $("#startcheck").prop('checked', false);
         $("#goalcheck").prop('checked', false);
         $("#startcheck").prop('disabled', true);
        $("#goalcheck").prop('disabled', true);
    });



 $("#again").click(function(e){

         $("#startcheck").prop('disabled', false);
        $("#goalcheck").prop('disabled', false);
    });



 $("#startchecklable").click(function(e){
   if ($("#startcheck").is(':disabled')) {
     $("#introduction").css("display", "block");
  $("#introduction").html('Can’t change the start position during learning process,'+ ' click'+' '+ '<img src=\'img/again.png\'  id=\'againintro\'>' +' '+'to re-set');
      
   }

    window.setTimeout( stop_popup, 6000 ); 

    function stop_popup(){
       $("#introduction").css("display", "none");  
    };

});

  $("#goalchecklable").click(function(e){
   if ($("#goalcheck").is(':disabled')) {
     $("#introduction").css("display", "block");
  $("#introduction").html('Can’t change the goal position during learning process,'+' click'+' '+ '<img src=\'img/again.png\'  id=\'againintro\'>' +' '+'to re-set');
      
   }

    window.setTimeout( stop_popup, 6000 ); 

    function stop_popup(){
       $("#introduction").css("display", "none");  
    };

});

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});


});



var takeScreenShot = function() {
    html2canvas(document.getElementById("screenshot"), {
        onrendered: function (canvas) {
            var tempcanvas=document.createElement('canvas');
            tempcanvas.width=520;
            tempcanvas.height=560;
            var context=tempcanvas.getContext('2d');
            context.drawImage(canvas,195,88,520,560,0,0,520,560);
           // var link=document.createElement("a");
            //link.href=tempcanvas.toDataURL('image/jpg');   //function blocks CORS
            //link.download = 'screenshot.jpg';
            //link.click();
            var dataURL =tempcanvas.toDataURL();
             //document.getElementById("screenshotimg").src = dataURL;
          var newContent = document.createTextNode("total:"+totaltime); 
           var newContentnotfind = document.createTextNode("path not found"); 

           var img = document.createElement("img");
 
img.src =  dataURL;
var src = document.getElementById("snapshot");

 
src.appendChild(img);

if(totaltime==null||totaltime==0)
{
src.appendChild(newContentnotfind);  

}

else
src.appendChild(newContent);


        }
    });
}


