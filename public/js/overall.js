$(document).ready(function(){
    $("#showMostNumOfRev").html("here shows the success of the overall js");

    $.getJSON('/showMostNumOfRev',null, function(revision) {
        console.log(revision._id);
        console.log(revision.numOfRev);
        $("#showMostNumOfRev").html("The article with the most number of revisions: " + revision._id);
    });

    // Overall task 2: The article with the least number of revisions
    $.getJSON('/showLeastNumOfRev',null, function(revision) {
        $("#showLeastNumOfRev").html("The article with the least number of revisions: " + revision._id);
    });

    // Overall task 3: The article edited by largest group of registered users
    $.getJSON('/showArticleLargestRegUser',null, function(revision) {
        $("#showArticleLargestRegUser").html("The article edited by largest group of registered users: " + revision._id);
    });

    // Overall task 4: The article edited by smallest group of registered users
    $.getJSON('/showArticleSmallestRegUser',null, function(revision) {
        $("#showArticleSmallestRegUser").html("The article edited by smallest group of registered users: " + revision._id);
    });

    // Overall task 5: The article with the longest history
    $.getJSON('/showArticleLongestHistory',null, function(revision) {
        $("#showArticleLongestHistory").html("The article with the longest history: " + revision.title);
    });

    // Overall task 6: The article with the shortest history
    $.getJSON('/showArticleShortestHistory',null, function(revision) {
        $("#showArticleShortestHistory").html("The article with the shortest history: " + revision.title);
    });

    $("#chart_result").load("/showOverallBarChartPage");

    $("#bar_chart").click(function(event){
        event.preventDefault();
        $("#chart_result").load("/showOverallBarChartPage");
    });

    $("#pie_chart").click(function(event){
        event.preventDefault();
        $("#chart_result").load("/showOverallPieChartPage");
    });


});
