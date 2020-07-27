function extraRuns(matchObj, year, deliveriesObj) {
    let matchIDs = matchObj.reduce((acc, cur) => {
        if (cur["season"] == year)
            acc.push(cur["id"])
        return acc;
    }, []);

    var minid = Math.min.apply(Math, matchIDs);
    var maxid = Math.max.apply(Math, matchIDs);
    return deliveriesObj.reduce((extras, delivery) => {
        if (delivery["match_id"] >= minid && delivery["match_id"] <= maxid)
            if (delivery["extra_runs"] > 0) {
                extras[delivery["bowling_team"]] = (extras[delivery["bowling_team"]] || 0) + parseInt(delivery["extra_runs"]);
            }
        return extras;
    }, {})
}
module.exports = extraRuns;
