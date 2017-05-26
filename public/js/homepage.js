$(document).ready(function(){
    $("#show_page").load("/overall");

    $("#show_individual").click(function(event){
        event.preventDefault();
        $("#show_page").load("/individual");
    });

    $("#show_overall").click(function(event){
        event.preventDefault();
        $("#show_page").load("/overall");
    });
});