$(document).ready(function(){

    $("#result").html("here shows the success of the individual js");

    $("#show").click(function(event){
        event.preventDefault();
        var title = {title: $("#title_text").val()};
        console.log(title);
        $("#individual_page").load("/showUpdateResultPage", title);
    });
});
