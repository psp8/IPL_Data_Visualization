function economy(matchObj, year, deliveryObj) {
    let matchIDs = matchObj.reduce((acc, cur) => {
        if (cur["season"] == year)
            acc.push(cur["id"])
        return acc;
    }, []);
    var minid = Math.min.apply(Math, matchIDs);
    var maxid = Math.max.apply(Math, matchIDs);
    var bowlerData = deliveryObj.reduce((acc, delivery) => {
        if (delivery["match_id"] >= minid && delivery["match_id"] <= maxid) {
            if (!parseInt(delivery['is_super_over'])) {
                if (delivery['bowler'] in acc) {
                    if ((delivery['wide_runs'] == '0' && delivery['noball_runs'] == '0')) {
                        acc[delivery['bowler']]['balls'] += 1;
                    }
                    acc[delivery['bowler']]["total"] += parseInt(delivery['total_runs']);
                } else {
                    acc[delivery['bowler']] = {
                        "total": 0,
                        "balls": 0,
                    };
                    acc[delivery['bowler']]["total"] = parseInt(delivery['total_runs']);
                    acc[delivery['bowler']]["balls"] = 1;
                }
            }
        }
        return acc;
    }, {})
    var arr = Object.keys(bowlerData).reduce((acc, bowler) => {
        var overs = bowlerData[bowler]["balls"] / 6;
        acc.push([bowler, (bowlerData[bowler]["total"] / overs).toFixed(2)]);
        return acc;
    }, []);

    arr.sort(function(a, b) {
        return a[1] - b[1];
    });


    return arr;


}
module.exports = economy;