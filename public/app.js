function fetchAndVisualizeData() {
    fetch("./data.json")
        .then(r => r.json())
        .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
    visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
    return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
        seriesData.push([year, matchesPlayedPerYear[year]]);
    }

    Highcharts.chart("matches-played-per-year", {
        chart: {
            type: "column"
        },
        title: {
            text: "Matches Played Per Year"
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches"
            }
        },
        series: [{
            name: "Years",
            data: seriesData
        }]
    });
}

//2
function fetchAndVisualizeDataWon() {
    fetch("./saveWon.json")
        .then(r => r.json())
        .then(visualizeDataWon);
}
fetchAndVisualizeDataWon();

function visualizeDataWon(data) {
    let teams = [];
    let matcheswon = [];
    Object.keys(data).map(key => {
        if (key) {
            teams.push(key);
            matcheswon.push(data[key]);
        }
    });
    visualizeMatchesWon(teams, matcheswon);
    return;
}

function visualizeMatchesWon(teams, matcheswon) {
    //console.log(teams, matcheswon, Object.keys(matcheswon[0]));
    const seriesDataWon = [];
    Object.keys(matcheswon[0]).map(year => {
        seriesDataWon.push({ name: year, data: matcheswon.map(matchDetails => matchDetails[year]) });
    });

    Highcharts.chart('Won-Matches', {

        chart: {
            type: 'column'
        },

        title: {
            text: 'Number Of Matches Won By a Team Per Year'
        },

        xAxis: {
            categories: teams
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of wins'
            }
        },

        tooltip: {
            formatter: function() {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: seriesDataWon
    });
}

//3

function fetchAndVisualizeData2() {
    fetch("./saveExtraRuns.json")
        .then(r => r.json())
        .then(visualizeDataRuns);
}

fetchAndVisualizeData2();

function visualizeDataRuns(data) {
    visualizeExtraRunsPerTeam(data);
    return;
}
function visualizeExtraRunsPerTeam(data) {
    const seriesDataRuns = [];
    for (let team in data) {
        seriesDataRuns.push([team, data[team]]);
    }

    Highcharts.chart("matches-extra-runs", {
        chart: {
            type: "column"
        },
        title: {
            text: "Extra Runs Scored By Each Team In 2016"
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Extra Runs"
            }
        },
        series: [{
            name: "Runs",
            data: seriesDataRuns
        }]
    });
}

//4
function fetchAndVisualizeData3() {
    fetch("./saveEconomy.json")
        .then(r => r.json())
        .then(visualizeEconomy);
}

fetchAndVisualizeData3();

function visualizeEconomy(dataEconomy) {
    visualizeEconomyRate(dataEconomy);
    return;
}
function visualizeEconomyRate(dataEconomy) {
    const seriesDataEconomy = [];
    for (let name in dataEconomy) {
        seriesDataEconomy.push([name, parseFloat(dataEconomy[name])]);
    }
    console.log(seriesDataEconomy);

    Highcharts.chart("top-economy", {
        chart: {
            type: "column"
        },
        title: {
            text: "Top 10 Economical Bowlers & Their Economy Rates in  2015"
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Economy"
            }
        },
        series: [{
            name: "Economy Rate",
            data: seriesDataEconomy
        }]
    });
}
//5
function fetchAndVisualizeData4() {
    fetch("./saveTopPlayer.json")
        .then(r => r.json())
        .then(visualizeTopPlayer);
}

fetchAndVisualizeData4();

function visualizeTopPlayer(dataTopPlayer) {
    visualizeTopPlayerData(dataTopPlayer);
    return;
}
function visualizeTopPlayerData(dataTopPlayer) {
    const seriesDataTopPlayer = [];
    for (let name in dataTopPlayer) {
        seriesDataTopPlayer.push([name, parseFloat(dataTopPlayer[name])]);
    }
    console.log(seriesDataTopPlayer);

    Highcharts.chart("top-players", {
        chart: {
            type: "column"
        },
        title: {
            text: "Top 10 Batsman"
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Runs"
            }
        },
        series: [{
            name: "Total Runs",
            data: seriesDataTopPlayer
        }]
    });
}