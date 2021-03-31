window.onload=function(){
  
document.getElementById("gamma").addEventListener('input', function () {getGamma(this.value) });

document.getElementById("learn").addEventListener('input', function () {getLearn(this.value) });


document.getElementById("pitvalue").addEventListener('input', function () {getPitvalue(this.value) });

document.getElementById("goalvalue").addEventListener('input', function () {getGoalvalue(this.value) });

document.getElementById("pitrange").addEventListener("change", function () {getRange(this.value) });




}



function getGamma(val) {
gamma=val;
if (gamma==0.9) {
document.getElementById("discountfactor_value").innerHTML = "immediate";
document.getElementById("discountfactor_value_2").innerHTML = "closer";
}

if (gamma==0.92) {
document.getElementById("discountfactor_value").innerHTML = "immediate1";
document.getElementById("discountfactor_value_2").innerHTML = "closer1";
}

if (gamma==0.94) {
document.getElementById("discountfactor_value").innerHTML = "immediate2";
document.getElementById("discountfactor_value_2").innerHTML = "closer2";
}

if (gamma==0.98) {
document.getElementById("discountfactor_value").innerHTML = "immediate3";
document.getElementById("discountfactor_value_2").innerHTML = "closer3";
}

if (gamma==1) {
document.getElementById("discountfactor_value").innerHTML = "immediate4";
document.getElementById("discountfactor_value_2").innerHTML = "closer4";
}


//console.log(gamma);
}


function getLearn(val) {
learnRate=val;

if (learnRate==0.5) {
document.getElementById("learningrate_value").innerHTML = "disregards";
document.getElementById("learningrate_value_2").innerHTML = "quicker";
}

if (learnRate==0.6) {
document.getElementById("learningrate_value").innerHTML = "disregards1";
document.getElementById("learningrate_value_2").innerHTML = "quicker1";
}

if (learnRate==0.7) {
document.getElementById("learningrate_value").innerHTML = "disregards2";
document.getElementById("learningrate_value_2").innerHTML = "quicker2";
}

if (learnRate==0.8) {
document.getElementById("learningrate_value").innerHTML = "disregards3";
document.getElementById("learningrate_value_2").innerHTML = "quicker3";
}
//console.log(learnRate);
}



function getPitvalue(val) {
pitvalue=val;
//console.log(pitvalue);
if (pitvalue==-1) {
document.getElementById("punishment_value").innerHTML = "moderately";
document.getElementById("punishment_value_2").innerHTML = "moderately quick";

}

else if (pitvalue==-3) {
document.getElementById("punishment_value").innerHTML = "slightly";
document.getElementById("punishment_value_2").innerHTML = "slightly quick";
}

else if (pitvalue==-5) {
document.getElementById("punishment_value").innerHTML = "highly";
document.getElementById("punishment_value_2").innerHTML = "quicker";
}

else if (pitvalue==-10) {
document.getElementById("punishment_value").innerHTML = "slightly highly";
document.getElementById("punishment_value_2").innerHTML = "slightly quicker";
}


else if (pitvalue==-30) {
document.getElementById("punishment_value").innerHTML = "moderately highly";
document.getElementById("punishment_value_2").innerHTML = "moderately quick";
}

else if (pitvalue==-100) {
document.getElementById("punishment_value").innerHTML = "very highly";
document.getElementById("punishment_value_2").innerHTML = "very quick";
}


}



function getGoalvalue(val) {
goalvalue=val;
//console.log(goalvalue);
if (goalvalue==1) {
document.getElementById("goalreward_value").innerHTML = "low";
document.getElementById("goalreward_value_2").innerHTML = "slow";
}

if (goalvalue==3) {
document.getElementById("goalreward_value").innerHTML = "moderate low";
document.getElementById("goalreward_value_2").innerHTML = "slightly slow";
}

if (goalvalue==5) {
document.getElementById("goalreward_value").innerHTML = "low";
document.getElementById("goalreward_value_2").innerHTML = "slow";
}

if (goalvalue==7) {
document.getElementById("goalreward_value").innerHTML = "high";
document.getElementById("goalreward_value_2").innerHTML = "fast";
}

if (goalvalue==10) {
document.getElementById("goalreward_value").innerHTML = "slightly  high";
document.getElementById("goalreward_value_2").innerHTML = "slightly fast";
}

if (goalvalue==30) {
document.getElementById("goalreward_value").innerHTML = "moderately high";
document.getElementById("goalreward_value_2").innerHTML = "moderately fast";
}

if (goalvalue==100) {
document.getElementById("goalreward_value").innerHTML = "very high";
document.getElementById("goalreward_value_2").innerHTML = "very fast";
}

if (goalvalue==1000) {
document.getElementById("goalreward_value").innerHTML = "extremely high";
document.getElementById("goalreward_value_2").innerHTML = "extremely fast";
}

}

function getRange(val) {
pitrange=val;
if (pitrange==0) {
document.getElementById("rangmove_value").innerHTML = "small";
}

else if (pitrange==3) {
document.getElementById("rangmove_value").innerHTML = "large";
}

else if (pitrange==5) {
document.getElementById("rangmove_value").innerHTML = "moderately large";
}

//console.log(pitrange);
}