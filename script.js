function submitForm() {
    var database = firebase.database();
    var ref = database.ref('teams');
    var newDict = {
        one: $("#input1").val(),
        two: $("#input2").val()
    };
    ref.child($("#teamNum").val()).child($("#matchNum").val()).set(newDict);
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

    //console.log(dataAll[teamSelected])
    //console.log(dataAll[teamList[teamList.indexOf(teamSelected)]]);

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



    //console.log(ref.child("4308").child("1").child("one"));

    // ref.on('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var data1 = childSnapshot.val();
    //       console.log(data1.child(2));
    //     });
    // });


    // ref.on('value', function(snap){
    //     var teamDict = snap.val();
    // })

    // console.log(teamDict[2]);

    // for (i in ref.child("4308")) {
    //     console.log(ref.child("4308").child(i).child("one"));
    // }
