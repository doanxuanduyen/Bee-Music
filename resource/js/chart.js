//chart
Highcharts.chart('chart', {
    title: {
        text: '',
    },
    xAxis: {
        categories: ['00:00','6:00','12:00','18:00']
    },
    yAxis: {
        title: {
            text: ''
        }
        ,
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        visible:false,
    },
    tooltip: {
        valueSuffix: ''
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name:'#1',
        data: [7.0, 6.9, 9.5, 14.5]
    },{
        name:'#2',
        data: [5.0, 8.9, 10.5, 12.5]
    },{
        name:'#3',
        data: [4.0, 6.9, 5.5, 10.5]
    }],
    chart: {
        polar: true,
        type: 'line',
        backgroundColor:'var(--color-chart)',
        borderColor: 'var(--color-border)',
        borderWidth: 3,
        height:160,
        width:330
    },
});

