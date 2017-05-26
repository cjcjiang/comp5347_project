$(document).ready(function(){
    $("#update_show").click(function(event){
        event.preventDefault();
        var title = $("#update_query_title").text();
        console.log("title in updateresult js is: " + title);
        var parameters = {user_query_title: title};
        $("#individual_page").load("/showIndividualResult", parameters);
    });
});
