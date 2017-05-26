$(document).ready(function(){
    var title = $("#update_query_title").text();
    var parameters = {user_query_title: title};

    $.get( "/showUpdateResult",parameters, function(result){
        console.log(result);
        $('#update_result').html(result);
        $('#continue_ref').html('<a href="/a" id="update_show">show individual result</a>');
    });

    // TODO: $("#update_show") does not work, try use another load

    $("#update_show").click(function(event){
        event.preventDefault();
        console.log("title in updateresult js is: " + title);
        $("#individual_page").load("/showIndividualResult", parameters);
    });
});
