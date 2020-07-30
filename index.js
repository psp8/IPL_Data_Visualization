const fs = require('fs');
const csv = require('csvtojson');
const matchesPlayedPerYear = require('./ipl/matchesPlayedPerYear');
const won = require('./ipl/won');
const extraRuns = require('./ipl/extraRuns');
const economy = require('./ipl/economy');
const MostRuns = require('./ipl/MostRuns');
var express = require('express');
var app = express();
//Allow  CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

const MATCHES_FILE_PATH = './csv_data/matches.csv';
const DELIVERIES_FILE_PATH = './csv_data/deliveries.csv';

app.get('/extraruns/:year', function(req, res) {
    const year = req.params.year;
    if (!year) {
        res.statusCode(500);
        res.send('invalid year');
    }
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then((deliveries) => {
                    res.send(extraRuns(matches, req.params.year, deliveries));
                });
        });
});
app.get('/economy/:year', function(req, res) {
    const year = req.params.year;
    if (!year) {
        res.statusCode(500);
        res.send('invalid year');
    }
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then((deliveries) => {
                    res.send(
                        economy(matches, req.params.year, deliveries)
                        .slice(0, 10)
                        .reduce((acc, key) => {
                            acc[key[0]] = key[1];
                            return acc;
                        }, {})
                    );
                });
        });
});
app.get('/matchesplayedperyear', function(req, res) {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            res.send(matchesPlayedPerYear(matches));
        });
});


app.get('/matcheswon', function(req, res) {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            res.send(won(matches));
        });
});

app.get('/mostruns', function(req, res) {
    csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
            res.send(
                MostRuns(deliveries)
                .slice(-10)
                .reduce((acc, key) => {
                    acc[key[0]] = key[1];
                    return acc;
                }, {})
            );
        });
});

app.listen(3000);