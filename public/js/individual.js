$(document).ready(function(){

    $("#result").html("here shows the success of the individual js");

    $("#show").click(function(event){
        event.preventDefault();
        $.getJSON('/showMjNumOfRevResult',null, function(revision) {
            console.log(revision._id);
            console.log(revision.numOfRev);
            $("#result").html("The article with the most number of revisions is " + revision.numOfRev);
        });
    })
});
