const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const won = require("./ipl/won");
const extraRuns = require("./ipl/extraRuns");
const economy = require("./ipl/economy");
const MostRuns = require("./ipl/MostRuns");



const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";

function main() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deliveries => {
                    let result = matchesPlayedPerYear(matches);
                    let result_won = won(matches);
                    let result_extra_runs = extraRuns(matches, 2016, deliveries);
                    let result_economy = economy(matches, 2015, deliveries);
                    let topRun = MostRuns(deliveries)

                    var res = result_economy.slice(0, 10).reduce((acc, key) => {
                        acc[key[0]] = key[1];
                        return acc;
                    }, {});

                    var topBatsman = topRun.slice((topRun.length - 10), topRun.length);
                    var batsman = topBatsman.reduce((acc, key) => {
                        acc[key[0]] = key[1];
                        return acc;
                    }, {});

                    saveMatchesPlayedPerYear(result);
                    saveWon(result_won);
                    saveRuns(result_extra_runs);
                    saveEconomy(res);
                    saveTopRuns(batsman);
                });
        });
}

function saveMatchesPlayedPerYear(result) {
    const jsonData = {
        matchesPlayedPerYear: result
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile('./public/data.json', jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveWon(result_won) {
    const jsonString = JSON.stringify(result_won);
    fs.writeFile('./public/saveWon.json', jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveRuns(result_extra_runs) {
    const jsonString = JSON.stringify(result_extra_runs);
    fs.writeFile('./public/saveExtraRuns.json', jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveEconomy(res) {
    const jsonString = JSON.stringify(res);
    fs.writeFile('./public/saveEconomy.json', jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveTopRuns(batsman) {
    const jsonString = JSON.stringify(batsman);
    console.log(jsonString)
    fs.writeFile('./public/saveTopPlayer.json', jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

main();