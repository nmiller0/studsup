var models = require("../models");

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

    var homeCoeff = await getTeamCoeff(homeTeam);
    homeCoeff = (homeCoeff + (homeCoeff * homeBonusMultiplier)) + Math.random() * matchRandomnessFactor;
    var awayCoeff = await getTeamCoeff(awayTeam);
    awayCoeff += Math.random() * matchRandomnessFactor;

    console.log(homeCoeff);
    console.log(awayCoeff);

    if (homeCoeff > awayCoeff) {
        newMatch.result = "Home";
        newMatch.awayGoals = Math.floor(Math.random() * 3);
        newMatch.homeGoals = newMatch.awayGoals + Math.floor(Math.random() + 1);
    } else {
        newMatch.result = "Away";
        newMatch.homeGoals = Math.floor(Math.random() * 3);
        newMatch.awayGoals = newMatch.homeGoals + Math.floor(Math.random() + 1);
    }
    newMatch.homeTeam = homeTeam._id;
    newMatch.awayTeam = awayTeam._id;
    newMatch.league = league;
    var match = models.Match.create(newMatch);
    return match;
}