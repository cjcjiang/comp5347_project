// Individual Pie Chart two draw function
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
    $.getJSON('/showDataForIndivPieChartRegUser',parameters, function(reg_revision) {
        console.log("reg_revision is: " + reg_revision.RegUsers);
        var reg_user_num_rev = reg_revision.RegUsers;
        console.log("reg_user_num_rev is: " + reg_user_num_rev);

        // Have admin user pie chart data
        $.getJSON('/showDataForIndivPieChartAdminUser',parameters, function(admin_revision){
            var admin_user_num_rev = admin_revision.AdminUsers;

            // Have bot user pie chart data
            $.getJSON('/showDataForIndivPieChartBotUser',parameters, function(bot_revision){
                var bot_user_num_rev = bot_revision.BotUsers;

                // Have anon uses pie chart data
                $.getJSON('/showDataForIndivPieChartAnonUser',parameters, function(anon_revision){
                    var anon_user_num_rev = anon_revision.AnonUsers;
                    drawChart(reg_user_num_rev, admin_user_num_rev, bot_user_num_rev, anon_user_num_rev);
                });
            });
        });
    });
});
