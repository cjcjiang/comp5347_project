// Overall Pie Chart two draw function
function drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev) {
    var data_temp = [
        ['Users', 'num_of_rev'],
        ['Administrator', admin_user_num_rev],
        ['Anonymous', anon_user_num_rev],
        ['Bot', bot_user_num_rev],
        ['Regular user', reg_user_num_rev]
    ];

    var data = google.visualization.arrayToDataTable(data_temp);

    console.log("draw data is: " + data);

    var options = {
        title: ''
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_result_page'));

    chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});

$(document).ready(function(){
    var promise_pie_chart = [];
    var reg_user_num_rev;
    var admin_user_num_rev;
    var bot_user_num_rev;
    var anon_user_num_rev;

    promise_pie_chart.push(
        $.getJSON('/showDataForOverallPieChartRegUser',null, function(reg_revision) {
            reg_user_num_rev = reg_revision[0].RegUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForOverallPieChartAdminUser',null, function(admin_revision){
            admin_user_num_rev = admin_revision[0].AdminUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForOverallPieChartBotUser',null, function(bot_revision){
            bot_user_num_rev = bot_revision[0].BotUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForOverallPieChartAnonUser',null, function(anon_revision){
            anon_user_num_rev = anon_revision[0].AnonUsers;})
    );

    $.when.apply($, promise_pie_chart).then(function(){
            drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev);
        }
    );

});