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
    var coeff = 0;
    var players = await models.Player.find({
        "_id": {
            $in: team.players
        }
    });
    players.forEach(function (player) {
        coeff += player.att;
        coeff += player.mid;
        coeff += player.def;
    });
    return coeff;
}

module.exports.playMatch = async function (homeTeam, awayTeam, league = null) {
    var newMatch = {};
    var homeBonusMultiplier = 0.10;
    var matchRandomnessFactor = 20;

    var homeCoeff = await module.exports.getTeamCoeff(homeTeam);
    homeCoeff = (homeCoeff + (homeCoeff * homeBonusMultiplier)) + Math.random() * matchRandomnessFactor;
    var awayCoeff = await module.exports.getTeamCoeff(awayTeam);
    awayCoeff += Math.random() * matchRandomnessFactor;

    console.log(homeCoeff);
    console.log(awayCoeff);

    var teamDiff = homeCoeff - awayCoeff;
    var drawThreshold = 7;
    if (teamDiff > drawThreshold) {
        newMatch.result = "Home";
        newMatch.awayGoals = Math.floor(Math.random() * 3);
        newMatch.homeGoals = newMatch.awayGoals + Math.floor(Math.random() + 1);
    } else if (teamDiff < -1*drawThreshold) {
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