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
    await league.save();
    league.seasons = [];
    league.seasons.push(await controllers.Season.newSeason(league._id, null));
    console.log(league.seasons[0]);
    await league.save();
    console.log(league);
    return league;
}

module.exports.newSeason = async function(league){ 
    var l = await module.exports.getLeague(league);
    var currentSeason = await controllers.Season.getCurrentSeason(league);
    var newSeason = await controllers.Season.newSeason(league,currentSeason.startYear+1);
    l.league.seasons.push(newSeason);
    l.league.matches = [];
    await l.league.save();
};

module.exports.getLeague = async function(league){
    var l = await models.league.findById(league);
    var teams = await models.Team.find({ "_id": {
        $in: l.teams
    }});
    return {teams: teams, league:l};
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