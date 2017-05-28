$(document).ready(function(){
    var title = $("#user_query_title").text();
    var parameters = {title: title};
    console.log(title);
    console.log(parameters);

    $.getJSON("/showNumOfRevForSpecificTitle",parameters, function(revision) {
        console.log(revision._id);
        console.log(revision.numOfRev);
        $("#individual_result").html("The number of revisions of this title is " + revision.numOfRev);
    });
});