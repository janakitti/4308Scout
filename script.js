function submitForm() {
    var database = firebase.database();
    var ref = database.ref('teams');

    var newDict = {
        one: $("#input1").val(),
        two: $("#input2").val()
    };

    ref.child($("#teamNum").val()).child($("#matchNum").val()).set(newDict);

}
