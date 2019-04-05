var faker = require("faker");
var models = require("../models/index");
var controllers = require("./index");

module.exports.getTeamObjects = async function (home, away) {
    var homeObject = await models.Team.findById(home);
    var awayObject = await models.Team.findById(away);

    return {homeTeam:homeObject, awayTeam:awayObject};
}
module.exports.getTeamFixtures = async function (team) {
    var teamObj = await models.Team.findById(team);
    var l = await controllers.League.getLeague(teamObj.league);

    var season = await controllers.Season.getCurrentSeason(l.league._id)
    var fixtures = await models.Fixture.find({
        "_id": {
            $in: season.fixtures
        }
    });
    var fixtureObjArr = [];
    // fixtures has 0 elements
    for (var i = 0; i < fixtures.length; i++) {
        var f = {};
        f.homeTeam = await models.Team.findById(fixtures[i].homeTeam);
        f.awayTeam = await models.Team.findById(fixtures[i].awayTeam);
        if (f.homeTeam.name === teamObj.name || f.awayTeam.name === teamObj.name) {
            f.startYear = fixtures[i].startYear;
            f.endYear = fixtures[i].endYear;
            fixtureObjArr.push(f);
        }
    }
    return fixtureObjArr;
}
module.exports.createTeam = async function (name = null, players = null, tier = null, league = null) {
    if (!players) {
        players = await controllers.Player.createTeamPlayers(tier);
    }
    var city = faker.address.city();
    if (!name) {
        name = city + " United";
    }
    var team = {
        city: city,
        name: name,
        players: players,
        league: league
    };
    var promise = models.Team.create(team);
    return promise;
};