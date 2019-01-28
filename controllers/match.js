var Match = require("../models/match");
var models = require("../models")
var matchController = {};

module.exports.playMatch = function (homeTeam, awayTeam) {
    console.log(homeTeam);
    var homeDef = 0;
    var homeAtt = 0;
    var homeMid = 0;
    homeTeam.players.forEach(function(player){
       homeAtt += player.att;
       homeMid += player.mid;
       homeDef += player.def;
    });
    var homeCoeff = homeDef + homeAtt + homeMid + 1;
    var awayDef = 0;
    var awayAtt = 0;
    var awayMid = 0;
    awayTeam.players.forEach(function(player){
       awayAtt += player.att;
       awayMid += player.mid;
       awayDef += player.def;
    });
    var awayCoeff = awayAtt + awayDef + awayMid;
    var newMatch = {};
    if(homeCoeff > awayCoeff){
        newMatch.result = "Home"
        newMatch.awayGoals = Math.floor(Math.random()+3)
        newMatch.homeGoals = newMatch.awayGoals + Math.floor(Math.random()+1)
    } else {
        newMatch.result = "Away"
        newMatch.homeGoals = Math.floor(Math.random()+3)
        newMatch.awayGoals = newMatch.homeGoals + Math.floor(Math.random()+1)
    }
    newMatch.homeTeam = homeTeam;
    newMatch.awayTeam = awayTeam;
    Match.create(newMatch, function(err, createdMatch){
        if(err){
            console.log(err);
        } else{
            console.log(createdMatch);
        }
    });
}
