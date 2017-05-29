$(document).ready(function(){
    // Show the drop down list
    $("#query_button").hide();

    $("#drop_down_list").load("/showDropDownListPage", function(){
        $("#query_button").show();
    });

    $("#query_button").click(function(event){
        event.preventDefault();
        var title_raw = $("#query_title option:selected").text();
        var title_array = title_raw.split("\t");
        var title = title_array[0];
        console.log("User's query title is: " + title);
        var date_now = new Date();
        // Browser can only get the local time
        // Turn it to Greenwich Mean Time(GMT), as the timestamp from MediaWikiAPI is GMT
        var date_now_string = date_now.toISOString();
        console.log(date_now_string);
        // Send user's query title and timestamp to the server
        var parameters = {title: title, timestamp: date_now_string};
        $("#individual_page").load("/showUpdateResultPage", parameters);
    });

});
