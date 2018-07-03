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

    //console.log(ref.child("4308").child("1").child("one"));

    // ref.on('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var data1 = childSnapshot.val();
    //       console.log(data1.child(2));
    //     });
    // });


    ref.on('value', function(snap){
        teamDict = snap.val();
    })

    console.log(teamDict[2]);

    // for (i in ref.child("4308")) {
    //     console.log(ref.child("4308").child(i).child("one"));
    // }

    var row = table.insertRow(-1);
    row.insertCell(0).innerHTML = "team";
    row.insertCell(1).innerHTML = "1";
    row.insertCell(2).innerHTML = "2";


}
