$(document).ready(function(){

    $("#result").html("here shows the success of the individual js");

    $("#show").click(function(event){
        event.preventDefault();
        var title = {title: $("#title_text").val()};

        var date = new Date();
        // 2016-04-20T16:18:51Z
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        console.log(date);
        console.log(time);

        console.log(title);

        // TODO: Check if this title need to have the update

        $("#individual_page").load("/showUpdateResultPage", title);
    });
});
