$(document).ready(function(){

    $("#result").html("here shows the success of the individual js");

    $("#show").click(function(event){
        event.preventDefault();
        var title = {title: $("#title_text").val()};
        console.log(title);

        // TODO: Check if this title need to have the update

        $("#individual_page").load("/showUpdateResultPage", title);
    });
});
