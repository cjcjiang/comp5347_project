// Individual Bar Chart one draw function
function drawChart(reg_user_first_year, reg_user_num_rev, admin_user_first_year, admin_user_num_rev, bot_user_first_year, bot_user_num_rev, anon_user_first_year, anon_user_num_rev) {
    var data_temp = [['Year', 'Administrator', 'Anonymous', 'Bot', 'Regular user']];

    console.log("reg_user_num_rev is: " + reg_user_num_rev);
    var admin_user_num_rev_len = admin_user_num_rev.length;
    var anon_user_num_rev_len = anon_user_num_rev.length;
    var bot_user_num_rev_len = bot_user_num_rev.length;
    var reg_user_num_rev_len = reg_user_num_rev.length;

    var num_len_array = [admin_user_num_rev_len, anon_user_num_rev_len, bot_user_num_rev_len, reg_user_num_rev_len];
    var max_len = Math.max.apply(Math, num_len_array);
    var start_year = 1000;

    if(max_len==admin_user_num_rev_len){start_year = admin_user_first_year;}
    if(max_len==anon_user_num_rev_len){start_year = anon_user_first_year;}
    if(max_len==bot_user_num_rev_len){start_year = bot_user_first_year;}
    if(max_len==reg_user_num_rev_len){start_year = reg_user_first_year;}

    for(var i=0;i<max_len;i++){
        console.log("i is: " + i);
        var year = parseInt(start_year)+i;
        var admin_num_of_rev;
        var anon_num_of_rev;
        var bot_num_of_rev;
        var reg_num_of_rev;

        if(admin_user_first_year<=year){
            var index = year-admin_user_first_year;
            if(index<admin_user_num_rev_len){
                admin_num_of_rev = admin_user_num_rev[index].numOfRev;
            }else{admin_num_of_rev=0;}
        }else{admin_num_of_rev=0;}
        if(anon_user_first_year<=year){
            var index = year-anon_user_first_year;
            if(index<anon_user_num_rev_len){
                anon_num_of_rev = anon_user_num_rev[index].numOfRev;
            }else{anon_num_of_rev=0;}
        }else{anon_num_of_rev=0;}
        if(bot_user_first_year<=year){
            var index = year-bot_user_first_year;
            if(index<bot_user_num_rev_len){
                bot_num_of_rev = bot_user_num_rev[index].numOfRev;
            }else{bot_num_of_rev=0;}
        }else{bot_num_of_rev=0;}
        if(reg_user_first_year<=year){
            var index = year-reg_user_first_year;
            if(index<reg_user_num_rev_len){
                reg_num_of_rev = reg_user_num_rev[index].numOfRev;
            }else{reg_num_of_rev=0;}
        }else{reg_num_of_rev=0;}

        data_temp.push([year,admin_num_of_rev, anon_num_of_rev, bot_num_of_rev, reg_num_of_rev]);
        console.log("data_temp[i] is: " + data_temp[i+1]);
    }

    var data = google.visualization.arrayToDataTable(data_temp);

    console.log("draw data is: " + data);


    var options = {
        chart: {
            title: 'Revision distribution by year and by user type for article' // 加传进来的title名字
        },
        hAxis: {format: 'decimal'},
        vAxis: {format: 'decimal'}
    };
    var chart = new google.charts.Bar(document.getElementById('chart_result_page'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}
google.charts.load('current', {'packages':['bar']});

$(document).ready(function(){
    var title = $("#user_query_title").text();
    console.log("bar chart user_query_title is: " + title);
    var parameters = {user_query_title: title};

    var promise_bar_chart = [];
    var reg_user_num_rev;
    var reg_user_first_year;
    var admin_user_num_rev;
    var admin_user_first_year;
    var bot_user_num_rev;
    var bot_user_first_year;
    var anon_user_num_rev;
    var anon_user_first_year;

    promise_bar_chart.push(
        $.getJSON('/showDataForIndivBarChartRegUser',parameters, function(reg_revision) {
            reg_user_num_rev = reg_revision;
            reg_user_first_year = reg_user_num_rev[0]._id;})
    );

    promise_bar_chart.push(
        $.getJSON('/showDataForIndivBarChartAdminUser',parameters, function(admin_revision){
            admin_user_num_rev = admin_revision;
            admin_user_first_year = admin_user_num_rev[0]._id;})
    );

    promise_bar_chart.push(
        $.getJSON('/showDataForIndivBarChartBotUser',parameters, function(bot_revision){
            bot_user_num_rev = bot_revision;
            bot_user_first_year = bot_user_num_rev[0]._id;})
    );

    promise_bar_chart.push(
        $.getJSON('/showDataForIndivBarChartAnonUser',parameters, function(anon_revision){
            anon_user_num_rev = anon_revision;
            anon_user_first_year = anon_user_num_rev[0]._id;})
    );

    $.when.apply($, promise_bar_chart).then(function() {
        drawChart(reg_user_first_year, reg_user_num_rev, admin_user_first_year, admin_user_num_rev, bot_user_first_year, bot_user_num_rev, anon_user_first_year, anon_user_num_rev);
    });

});