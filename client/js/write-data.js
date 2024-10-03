//submit form
$("#submit").click(function() {
    alert("Submit button was pressed");
});

//clear entire form
$("#clear").click(function() {
    $("#reservation")[0].reset();
});