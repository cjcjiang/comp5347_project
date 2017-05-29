// Individual Chart two draw function
function drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev) {
    var data_temp = [
        ['Users', 'num_of_rev'],
        ['Administrator', admin_user_num_rev],
        ['Anon', anon_user_num_rev],
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
    // Have Reg User pie chart data
    $.getJSON('/showDataForIndivPieChartRegUser',null, function(reg_revision) {
        var reg_user_num_rev = reg_revision[0].RegUsers;
        console.log("reg_user_num_rev is: " + reg_user_num_rev);

        // Have admin user pie chart data
        $.getJSON('/showDataForIndivPieChartAdminUser',null, function(admin_revision){
            var admin_user_num_rev = admin_revision[0].AdminUsers;

            // Have bot user pie chart data
            $.getJSON('/showDataForIndivPieChartBotUser',null, function(bot_revision){
                var bot_user_num_rev = bot_revision[0].BotUsers;

                // Have anon uses pie chart data
                $.getJSON('/showDataForIndivPieChartAnonUser',null, function(anon_revision){
                    var anon_user_num_rev = anon_revision[0].AnonUsers;
                    drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev);
                });
            });
        });
    });
});
