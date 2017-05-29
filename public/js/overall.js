$(document).ready(function(){

    $("#result").html("here shows the success of the overall js");

    $("#show").click(function(event){
        event.preventDefault();
        $.getJSON('/result',null, function(revision) {
            console.log(revision._id);
            console.log(revision.numOfRev);
            $("#result").html("The article with the most number of revisions is " + revision._id);
        });

        // Have the test of the chart data
        $.getJSON('/showDataForOverallBarChartRegUser',null, function(revision) {
            // console.log(revision._id);
            // console.log(revision.numOfRev);
            var rev_string = revision.toString();
            $("#chart_one_result").html("The article with the most number of revisions is " + rev_string);
        });

    });
});
