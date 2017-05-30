$(document).ready(function(){
    var title = $("#update_query_title").text();
    var timestamp = $("#update_query_timestamp").text();
    var parameters = {user_query_title: title, user_query_timestamp: timestamp};

    $("#update_show").hide();
    $('#update_result').html("Checking if the data in the database is up to date");

    $.get( "/showUpdateResult",parameters, function(result){
        console.log(result);
        $('#update_result').html(result);
        $("#update_show").show();
    });

    $("#update_show").click(function(event){
        event.preventDefault();
        console.log("title in updateresult js is: " + title);
        $("#individual_page").load("/showIndividualResult", parameters);
    });
});
