var models = require("../models/index");
var controllers = require("./index");
var teamController = require("./team");

module.exports.createLeague = async function (name = null, team = null, tier = null) {
    var teams = [];
    var numTeamsToGen = 20;
    var l = {
        name: name,
        teams: [],
        tier: tier
    };
    var league = await models.league.create(l);
    if (team) {
        teams.push(team);
        numTeamsToGen--;
    }
    for (var i = 0; i < numTeamsToGen; i++) {
        var newTeam = await teamController.createTeam(null, null, tier, league);
        teams.push(newTeam);
    }
    league.teams = teams;
    league.save();
    console.log(league);
    return league;
}

module.exports.playLeagueMatch = async function (homeTeam, awayTeam) {
    var match = await controllers.Match.playMatch(homeTeam, awayTeam, homeTeam.league);
    var league = await models.league.find(homeTeam.league);
    //careful of query with one result vs model
    league = league[0];
    console.log(league);
    league.matches.push(match);
    league.save();
    return match;
}