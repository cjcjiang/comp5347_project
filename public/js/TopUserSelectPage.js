function drawChart(temp_chart_data) {
    var data = google.visualization.arrayToDataTable(temp_chart_data);

    var options = {
        chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
    };

    var chart = new google.charts.Bar(document.getElementById('indi_chart_result'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}

google.charts.load('current', {'packages':['bar']});

$(document).ready(function(){
    var title = $("#user_query_title").text();
    var user_array = [];

    $("#select_user_button").click(function(event){
        event.preventDefault();

        if ($('#top_one_user').is(":checked"))
        {
            var user = $('#top_one_user_text').text();
            user_array.push(user);
        }
        if ($('#top_two_user').is(":checked"))
        {
            var user = $('#top_two_user_text').text();
            user_array.push(user);
        }
        if ($('#top_three_user').is(":checked"))
        {
            var user = $('#top_three_user_text').text();
            user_array.push(user);
        }
        if ($('#top_four_user').is(":checked"))
        {
            var user = $('#top_four_user_text').text();
            user_array.push(user);
        }
        if ($('#top_five_user').is(":checked"))
        {
            var user = $('#top_five_user_text').text();
            user_array.push(user);
        }
        console.log("the user_array is: " + user_array);

        // Send user's query title and selected users to the server
        var parameters = {title: title, selected_user: user_array};

        $.getJSON("/showDataForIndivChartSelectedUser",parameters, function(back_data) {
            var users_array = back_data.users;
            var result = back_data.result;
            var result_len = result.length;
            var year_array = [];
            for(var i=0;i<result_len;i++){
                var this_year = parseInt(result[i]._id.time);
                year_array.push(this_year);
            }
            var min_year = Math.min.apply(Math, year_array);
            var max_year = Math.max.apply(Math, year_array);
            var users_array_len = users_array.length;
            var chart_data_first_array = ['year'];
            for(var i=0;i<users_array_len;i++){
                chart_data_first_array.push(users_array[i]);
            }
            var temp_chart_data = [chart_data_first_array];

            for(var i=0;(min_year+i)<=max_year;i++){
                var test_year = min_year+i;
                var data_each_array = [test_year];
                for(var p=0;p<users_array_len;p++){
                    var flag = 0;
                    var test_user = users_array[p];
                    for(var q=0;q<result_len;q++){
                        var this_rev = result[q];
                        var this_year = parseInt(this_rev._id.time);
                        var this_user = this_rev._id.user;
                        var this_numOfRev = this_rev.numOfRev;
                        if((this_year==test_year)&&(this_user===test_user)){
                            flag =1;
                            data_each_array.push(this_numOfRev);
                        }
                    }
                    if(flag==0){
                        data_each_array.push(0);
                    }
                }
                temp_chart_data.push(data_each_array);
            }

            drawChart(temp_chart_data);

            console.log("chart data first line: " + temp_chart_data[0]);
            console.log("chart data second line: " + temp_chart_data[1]);

            console.log("back data users is: " + users_array);
        });

    });

});
