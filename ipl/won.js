function won(matches) {
    var result = matches.reduce((acc, cur) => {
        if (cur["winner"] in acc)
            acc[cur["winner"]].push(cur["season"]);
        else {
            acc[cur["winner"]] = new Array();
            acc[cur["winner"]].push(cur["season"]);
        }
        return acc;
    }, {})

    let years = Object.values(result).join(',');
    let Repeatedyears = years.split(',');
    let uniqueYear = Array.from(new Set(Repeatedyears));
    let resultObj = Object.keys(result).reduce((acc, cur) => {
        acc[cur] = uniqueYear.reduce(function(count, year) {
            if (result[cur].includes(year)) {
                count[year] = getCount(year, result[cur]);
            } else {
                count[year] = 0;
            }
            return count;
        }, {})
        return acc;
    }, {})

    function getCount(year, arr) {
        return arr.reduce((acc, cur) => {
            if (cur == year)
                acc = (acc || 0) + 1;
            return acc;
        }, 0)
    }
    return resultObj;
}
module.exports = won;