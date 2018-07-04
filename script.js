function submitForm() {
    var database = firebase.database();
    var ref1 = database.ref('teams');
    var newDict = {
        one: $("#input1").val(),
        two: $("#input2").val()
    };
    ref1.child($("#teamNum").val()).child($("#matchNum").val()).set(newDict);

    var ref2 = database.ref('scouterData');

    ref2.push($("#scoutID").val());
}

function displayTeam() {
    var database = firebase.database();
    var ref = database.ref('teams');
    var table = document.getElementById("display");

    ref.on('value', gotData, errData);
}

function gotData(data) {
    //console.log(data.val());
    var teamSelected = $("#searchBar").val();
    var table = document.getElementById("display");
    var dataAll = data.val();
    var teamList = Object.keys(dataAll);

    var matchList = Object.keys(dataAll[teamSelected]);
    for (var i = 0; i < table.rows.length; i++) {
        table.deleteRow(-1);
    }
    for (var i = 0; i < matchList.length; i++) {
        var currentMatch = matchList[i];
        var data1 = dataAll[teamSelected][currentMatch].one;
        var data2 = dataAll[teamSelected][currentMatch].two;
        var row = table.insertRow(-1);
        row.insertCell(0).innerHTML = currentMatch;
        row.insertCell(1).innerHTML = data1;
        row.insertCell(2).innerHTML = data2;
    }
}

function errData(err) {
    console.log("error!");
    console.log(err);
}


function promptChart() {
    var database = firebase.database();
    var ref = database.ref('scouterData');
    ref.on('value', drawChart, errData);
}
// Draw the chart and set the chart values
function drawChart(data) {

    var dataAll = data.val();
    var scouterList = Object.values(dataAll);

    var submitFreq = {};

    for (var i = 0; i < scouterList.length; i ++) {
        var scouter = scouterList[i];
        if (submitFreq[scouter] == null) {
            submitFreq[scouter] = 1;
        } else {
            submitFreq[scouter] += 1;
        }
    }

    console.log(sortProperties(submitFreq));
    var submitFreqArray = sortProperties(submitFreq);
    submitFreqArray.unshift(['Scouter', 'Submissions'])

    var x = google.visualization.arrayToDataTable(submitFreqArray);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'Scouter Submissions', 'width':550, 'height':400};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(x, options);
}


function sortProperties(obj) {
  // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}
