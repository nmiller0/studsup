var models = require("../models");


module.exports.getLeagueMatches = async function (league) {
    var matches = await models.Match.find({
        "_id": {
            $in: league.matches
        }
    });
    var teams = await models.Team.find({
        "_id": {
            $in: league.teams
        }
    });
    var matchObjects = [];
    for (var i = 0; i < matches.length; i++) {
        var m = {};
        m.homeTeam = teams.find(t => {
            return t.id.toString() == matches[i].homeTeam.toString();
        }).name;
        m.awayTeam = teams.find(t => {
            return t.id.toString() == matches[i].awayTeam.toString();
        }).name;
        m.homeGoals = matches[i].homeGoals;
        m.awayGoals = matches[i].awayGoals;
        m.id = matches[i]._id.toString();
        matchObjects.push(m);
    }
    return matchObjects;
}

module.exports.getTeamCoeff = async function (team) {
    var players = await models.Player.find({
        "_id": {
            $in: team.players
        }
    });
    var attackers = selectTopPlayers(getPlayerGroups(players, "att"), 2);
    var defenders = selectTopPlayers(getPlayerGroups(players, "def"), 4);
    var midfielders = selectTopPlayers(getPlayerGroups(players, "mid"), 4);
    var goalkeepers = selectTopPlayers(getPlayerGroups(players, "gk"), 1);

    var attackersCoeff = getGroupCoeff(attackers);
    var defendersCoeff = getGroupCoeff(defenders);
    var midfieldersCoeff = getGroupCoeff(midfielders);
    var goalkeepersCoeff = getGroupCoeff(goalkeepers);

    var coeff = {
        att: attackersCoeff,
        def: defendersCoeff,
        mid: midfieldersCoeff,
        gk: goalkeepersCoeff,
        overall: (attackersCoeff + defendersCoeff + midfieldersCoeff + goalkeepersCoeff)
    };
    return coeff;
}

function getPlayerGroups(players, pos) {
    var playerGroup = [];
    players.forEach(function (player) {
        if (player.position.toLowerCase() === pos.toLowerCase()) {
            playerGroup.push(player);
        }
    });
    return playerGroup;
}

function selectTopPlayers(players, num) {
    players.sort((a, b) => {
        return a - b;
    });
    var topPlayers = players.slice(players.length - num);
    return topPlayers;
}

function getGroupCoeff(players) {
    var coeff = 0;
    players.forEach(function (player) {
        coeff += player.att;
        coeff += player.def;
        coeff += player.mid;
        coeff += player.gk;
    });
    return coeff;
}
// split players into gk def mid att, then sort and select in a 4-4-2 of best players.
// return coeff object?
module.exports.playMatch = async function (homeTeam, awayTeam, league = null) {
    var newMatch = {};
    var homeBonusMultiplier = 0.10;
    var matchRandomnessFactor = 10;

    var homeCoeff = await module.exports.getTeamCoeff(homeTeam);
    homeCoeff.overall = (homeCoeff.overall + (homeCoeff.overall * homeBonusMultiplier)) + Math.random() * matchRandomnessFactor;
    var awayCoeff = await module.exports.getTeamCoeff(awayTeam);
    awayCoeff.overall += Math.random() * matchRandomnessFactor;

    console.log(homeCoeff);
    console.log(awayCoeff);

    var teamDiff = homeCoeff.overall - awayCoeff.overall;
    var drawThreshold = 4;

    if (teamDiff > drawThreshold) {
        newMatch.result = "Home";
        newMatch.awayGoals = Math.floor(Math.random() * 3);
        newMatch.homeGoals = newMatch.awayGoals + Math.floor(Math.random() + 1);
    } else if (teamDiff < -1 * drawThreshold) {
        newMatch.result = "Away";
        newMatch.homeGoals = Math.floor(Math.random() * 3);
        newMatch.awayGoals = newMatch.homeGoals + Math.floor(Math.random() + 1);
    } else {
        newMatch.result = "Draw";
        newMatch.homeGoals = Math.floor(Math.random() * 3);
        newMatch.awayGoals = newMatch.homeGoals;
    }
    newMatch.homeTeam = homeTeam._id;
    newMatch.awayTeam = awayTeam._id;
    newMatch.league = league;
    var match = models.Match.create(newMatch);
    return match;
}