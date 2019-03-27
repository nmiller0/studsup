var models = require("../models/index");
var controllers = require("./index");

var generateFixtures = async function (league, season) {
    var l = await controllers.League.getLeague(league);
    var teams = l.teams;
    var fixtures = [];
    var numTeams = l.teams.length;
    for (var i = 0; i < numTeams; i++) {
        var team = teams.pop();
        for(var x = 0; x < teams.length; x++){
            var f1 = await createFixture(team, teams[x], league, season);
            var f2 = await createFixture(teams[x], team, league, season);
            fixtures.push(f1);
            fixtures.push(f2);
        }
    }
    return fixtures;
}

async function createFixture(home,away,league,season){
    var f = {};
    f.homeTeam = home;
    f.awayTeam = away;
    f.season = season;
    f.league = league;
    var fixture = await models.Fixture.create(f);
    return fixture;
}

module.exports = {
    generateFixtures: generateFixtures
}