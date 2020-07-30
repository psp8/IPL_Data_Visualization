const url = 'http://127.0.0.1:3000/';

function fetchAndVisualizeData() {
    fetch(url + 'matchesplayedperyear')
        .then((r) => r.json())
        .then(visualizeMatchesPlayedPerYear);
}

fetchAndVisualizeData();

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
        seriesData.push([year, matchesPlayedPerYear[year]]);
    }

    Highcharts.chart('matches-played-per-year', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Matches Played Per Year',
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches',
            },
        },
        series: [{
            name: 'Years',
            data: seriesData,
        }, ],
    });
}

//2
function fetchAndVisualizeDataWon() {
    fetch(url + 'matcheswon')
        .then((r) => r.json())
        .then(visualizeDataWon);
}
fetchAndVisualizeDataWon();

function visualizeDataWon(data) {
    let teams = [];
    let matcheswon = [];
    Object.keys(data).map((key) => {
        if (key) {
            teams.push(key);
            matcheswon.push(data[key]);
        }
    });
    visualizeMatchesWon(teams, matcheswon);
    return;
}

function visualizeMatchesWon(teams, matcheswon) {
    const seriesDataWon = [];
    Object.keys(matcheswon[0]).map((year) => {
        seriesDataWon.push({ name: year, data: matcheswon.map((matchDetails) => matchDetails[year]) });
    });

    Highcharts.chart('Won-Matches', {
        chart: {
            type: 'column',
        },

        title: {
            text: 'Number Of Matches Won By a Team Per Year',
        },

        xAxis: {
            categories: teams,
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of wins',
            },
        },

        tooltip: {
            formatter: function() {
                return (
                    '<b>' +
                    this.x +
                    '</b><br/>' +
                    this.series.name +
                    ': ' +
                    this.y +
                    '<br/>' +
                    'Total: ' +
                    this.point.stackTotal
                );
            },
        },

        plotOptions: {
            column: {
                stacking: 'normal',
            },
        },

        series: seriesDataWon,
    });
}

//3

function fetchAndVisualizeData2() {
    const year = document.getElementById('extraruns').value;
    fetch(url + 'extraruns/' + year)
        .then((r) => r.json())
        .then((data) => visualizeExtraRunsPerTeam(data, year));
}

fetchAndVisualizeData2();

function visualizeExtraRunsPerTeam(data, year) {
    const seriesDataRuns = [];
    for (let team in data) {
        seriesDataRuns.push([team, data[team]]);
    }

    Highcharts.chart('matches-extra-runs', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Extra Runs Scored By Each Team In ' + year,
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra Runs',
            },
        },
        series: [{
            name: 'Runs',
            data: seriesDataRuns,
        }, ],
    });
}

//4
function fetchAndVisualizeData3() {
    const year = document.getElementById('economy').value;
    fetch(url + 'economy/' + year)
        .then((r) => r.json())
        .then((data) => visualizeEconomyRate(data, year));
}

fetchAndVisualizeData3();

function visualizeEconomyRate(dataEconomy, year) {
    const seriesDataEconomy = [];
    for (let name in dataEconomy) {
        seriesDataEconomy.push([name, parseFloat(dataEconomy[name])]);
    }

    Highcharts.chart('top-economy', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Top 10 Economical Bowlers & Their Economy Rates in ' + year,
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Economy',
            },
        },
        series: [{
            name: 'Economy Rate',
            data: seriesDataEconomy,
        }, ],
    });
}
//5
function fetchAndVisualizeData4() {
    fetch(url + 'mostruns')
        .then((r) => r.json())
        .then(visualizeTopPlayerData);
}

fetchAndVisualizeData4();


function visualizeTopPlayerData(dataTopPlayer) {
    const seriesDataTopPlayer = [];
    for (let name in dataTopPlayer) {
        seriesDataTopPlayer.push([name, parseFloat(dataTopPlayer[name])]);
    }

    Highcharts.chart('top-players', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Top 10 Batsman',
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Runs',
            },
        },
        series: [{
            name: 'Total Runs',
            data: seriesDataTopPlayer,
        }, ],
    });
}