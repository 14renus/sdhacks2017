var firstShot = true;
var firstShotTime;
var bac = 0;
var shots = 0;
var tolerance = 2;
var isMale = true;
var weight = 140;
var tispy = 0.06;
var drunk = 0.1;
var throwUp = 0.15;
var comatose = 0.3;

function takeShot() {
    if (firstShot){
      firstShotTime = new Date().getTime();
      firstShot = false;
    }

    shots += 1;
    var ouncesAlcy = shots * 0.6;

    bac = calculateBAC(ouncesAlcy, isMale);

    // graph feeling
    //set new drive time
    var graphBAC = bac + shots * 0.01 * (2-tolerance);
    rangeValue = graphBAC / 0.3 * 100
    document.getElementById("myRange").value = rangeValue;

    document.getElementById("shots").innerHTML = shots;
    document.getElementById("BAC").innerHTML = bac.toString() + "%";
    updateNextDrinkTime();

};

function graphBAC(){
    var graphBAC = bac + shots * 0.01 * (2-tolerance);
    rangeValue = graphBAC / 0.3 * 100
    document.getElementById("myRange").value = rangeValue;
}


var countDownDate = new Date().getTime();

function getNewDriveTime(mybac) {
var time = ((mybac-0.08)/0.15) * 3600 * 1000;
countDownDate = new Date().getTime()+ time;
    if (countDownDate < new Date().getTime()) {
        countDownDate = new Date().getTime();
        return 0;
    }
    return time;
}

function updateNextDrinkTime() {

var addTime1 = "One more drink adds ";
var addTime2 = " minute(s) to the timer.";
var futureBAC = calculateBAC(0.6*(shots+1), isMale);
var timeDiffMinutes = (getNewDriveTime(futureBAC) - getNewDriveTime(bac))/(1000*60);
var str = addTime1 + Math.ceil(timeDiffMinutes, 1).toString() + addTime2;
document.getElementById("asdf").innerHTML = str;
}

// Set the date we're counting down to

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 0) {
        //clearInterval(x);
        document.getElementById("demo").innerHTML = "You're sober!";
        document.getElementById("demo").style.backgroundColor = "LightGreen";
    }
}, 1000);


function calculateBAC(ouncesAlcy, isMale){
    var timeDiff = (new Date().getTime() - firstShotTime) / 3600 / 1000
    var bac;
    if (isMale){
      bac = ouncesAlcy * 5.14 / (weight * 0.73) - timeDiff * 0.15
    } else {
      bac = ouncesAlcy * 5.14 / (weight * 0.66) - timeDiff * 0.15
    }
    bac = bac * 100;
    bac = Math.round(bac) / 100;
    return bac;
};

var data2 = [
  { key: "Light Weight", value: "This is some sample text associated with first item." },
  { key: "Light to Medium", value: "This is some sample text associated with first item." },
  { key: "Medium Weight", value: "This is some sample text associated with second item." },
  { key: "Medium to Heavy", value: "This is some sample text associated with first item." },
  { key: "Heavy Weight", value: "This is some sample text associated with third item." }
];


var rangeslide2 = rangeslide("#rangeslide2", {
  data: data2,
  startPosition: tolerance,
  showLabels: true,
  labelsPosition: "below",
  tickHeight: 6,
  showTicks: true,
  showTrackMarkers: true,
  showTrackProgress: true,
  showTrackMarkersProgress: true,
      dataSource: "value",
      labelsContent: "key",
      valueIndicatorContent: "key",
  enableLabelClick: false,
  enableMarkerClick: false,
  enableTrackClick: false
});
