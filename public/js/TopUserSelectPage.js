$(document).ready(function(){
    var title = $("#user_query_title").text();

    $("#select_user_button").click(function(event){
        event.preventDefault();
        var user_array = $("#selected_user").val();

        console.log("User's query user_array is: " + user_array);
        // var user_array = user_raw.toString().split(",");
        // console.log("User's query user_array is: " + user_array);

        // Send user's query title and selected users to the server
        var parameters = {title: title, selected_user: user_array};
        $("#indi_chart_result").load("/showSelectUserBarChartPage", parameters);
    });

});
