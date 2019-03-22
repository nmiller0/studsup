var models = require("../models/index");
var controllers = require("./index");

var generateFixtures = async function (league, season) {
    var l = await controllers.League.getLeague(league);
    var teams = l.teams;
    var fixtures = [];
    var numTeams = l.teams.length;
    for (var i = 0; i < numTeams; i++) {
        var team = teams.pop();
        teams.forEach(t =>{
            var f1 = createFixture(team, t, league, season);
            var f2 = createFixture(t, team, league, season);
            fixtures.push(f1);
            fixtures.push(f2);
        });
    }
    return fixtures;
}

function createFixture(home,away,league,season){
    var f = {};
    f.homeTeam = home;
    f.awayTeam = away;
    f.season = season;
    f.league = league;
    return f;
}

module.exports = {
    generateFixtures: generateFixtures
}