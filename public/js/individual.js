$(document).ready(function(){
    $("#result").html("here shows the success of the individual js");

    $("#show").click(function(event){
        event.preventDefault();
        var title = $("#title_text").val();
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
