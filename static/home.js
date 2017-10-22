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
};

function graphBAC(){
    var graphBAC = bac + shots * 0.01 * (2-tolerance);
    rangeValue = graphBAC / 0.3 * 100
    document.getElementById("myRange").value = rangeValue;
}

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
