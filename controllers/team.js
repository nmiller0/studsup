var faker = require("faker");
var models = require("../models/index");
var controllers = require("./index");

module.exports.getTeamObjects = async function(home, away){
    var homeObject = await models.Team.find({"_id":home});
    var awayObject = await models.Team.find({"_id":away});
    return [homeObject,awayObject];
}
module.exports.getTeamFixtures = async function(team){
        var teamObj = await models.Team.findById(team);
        var league = await controllers.League.getLeague(teamObj.league);
        var season = await controllers.Season.getCurrentSeason(league)
        var fixtures = await models.Fixture.find({
            "_id": {
                $in : season.fixtures   
            }
        });
        var fixtureObjArr = [];
        // fixtures has 0 elements
        fixtures.forEach(async function(fixture){
            var f = {};
            f.homeTeam = await models.Team.findById(fixture.homeTeam);
            f.awayTeam = await models.Team.findById(fixture.awayTeam);
            f.startYear = fixture.startYear;
            f.endYear = fixture.endYear;
            fixtureObjArr.push(f);
        });
        return fixtureObjArr;
}
module.exports.createTeam = async function (name = null, players = null, tier = null, league = null) {
    if (!players) {
        players = await controllers.Player.createTeamPlayers(tier);
    }
    var city = faker.address.city();
    if(!name){
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