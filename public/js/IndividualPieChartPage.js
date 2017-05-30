// Individual Pie Chart two draw function
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
        // no title
        title: ''
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_result_page'));

    chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});

$(document).ready(function(){
    // Have Reg User pie chart data
    var title = $("#user_query_title").text();
    var parameters = {title: title};


    var promise_pie_chart = [];
    var reg_user_num_rev;
    var admin_user_num_rev;
    var bot_user_num_rev;
    var anon_user_num_rev;

    promise_pie_chart.push(
        $.getJSON('/showDataForIndivPieChartRegUser',parameters, function(reg_revision) {
            reg_user_num_rev = reg_revision.RegUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForIndivPieChartAdminUser',parameters, function(admin_revision){
            admin_user_num_rev = admin_revision.AdminUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForIndivPieChartBotUser',parameters, function(bot_revision){
            bot_user_num_rev = bot_revision.BotUsers;})
    );

    promise_pie_chart.push(
        $.getJSON('/showDataForIndivPieChartAnonUser',parameters, function(anon_revision){
            anon_user_num_rev = anon_revision.AnonUsers;})
    );

    $.when.apply($, promise_pie_chart).then(function(){
            drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev);
        }
    );

});
