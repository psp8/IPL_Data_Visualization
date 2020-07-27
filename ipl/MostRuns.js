function MostRuns(deliveryObj) {
    var batsmanData = deliveryObj.reduce((acc, delivery) => {
        if (delivery['batsman'] in acc) {
            acc[delivery['batsman']]["total"] += parseInt(delivery['total_runs']);
        } else {
            acc[delivery['batsman']] = {
                "total": 0,
            };
            acc[delivery['batsman']]["total"] = parseInt(delivery['total_runs']);
        }
        return acc;
    }, {})

    var arr = Object.keys(batsmanData).reduce((acc, batsman) => {
        acc.push([batsman, batsmanData[batsman]["total"]]);
        return acc;
    }, []);

    arr.sort(function(a, b) {
        return a[1] - b[1];
    });


    return arr;
}
module.exports = MostRuns;