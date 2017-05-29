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

    $.getJSON("/showIndivTopFive",parameters, function(revision) {
        var parameters_top_five = {top_five_user: revision};
        $("#top_five_table").load("/showIndiTablePage", parameters_top_five);
    });

    $("#indi_chart_result").load("/showIndividualBarChartPage", parameters);


});