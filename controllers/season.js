var models = require("../models/index");

var newSeason = async function(league, startYear = null){ 
    var l = await models.league.findById(league);
    var season = {};
    season.startYear = startYear ? startYear : 19;
    season.endYear = season.startYear + 1;
    season.teams = l.teams;
    season.league = l._id;
    season.matches = [];
}

var getCurrentSeason = async function (league) {
    var l = await models.league.findById(league);
    var seasons = await models.find({
        "_id": {
            $in: l.seasons
        }
    });
    var latestYear = 0;
    var latestSeason = {};
    for (var s in seasons) {
        if (s.startYear > latestYear) {
            latestSeason = s;
        }
    }

    return latestSeason;
}


module.exports = {
    getCurrentSeason: getCurrentSeason,
    newSeason : newSeason
}