var Match = require("../models/match");
var Player = require("../models/");
var models = require("../models");
var asyncModule = require("async");


function getTeamPlayers(team){
    var promise = models.Player.find({ "_id" : { $in : team.players } });
    return promise;
}

async function getTeamCoeff(team, callback){
    var coeff = 0;
    await models.Player.find({ "_id" : { $in : team.players } }, function(err, players){
        players.forEach(function(player){
            console.log(player);
            coeff += player.att;
            coeff += player.mid;
            coeff += player.def;
         });
         callback(null,coeff);
         return coeff;
    });
}



module.exports.playMatch = async function (homeTeam, awayTeam) {
    var newMatch = {};
    

    //run calls for both teams in paraellel so that both calls finish
    asyncModule.parallel([
        function(callback){
            getTeamCoeff(homeTeam,callback);
        },
        function(callback){
            getTeamCoeff(awayTeam,callback);
        }
    ], function(err,results){
        var homeCoeff = results[0];
        var awayCoeff = results[1];
        if(homeCoeff > awayCoeff){
            newMatch.result = "Home";
            newMatch.awayGoals = Math.floor(Math.random()*3);
            newMatch.homeGoals = newMatch.awayGoals + Math.floor(Math.random()+1);
        } else {
            newMatch.result = "Away";
            newMatch.homeGoals = Math.floor(Math.random()*3);
            newMatch.awayGoals = newMatch.homeGoals + Math.floor(Math.random()+1);
        }
        newMatch.homeTeam = homeTeam;
        newMatch.awayTeam = awayTeam;
        Match.create(newMatch, function(err, createdMatch){
            console.log(homeCoeff);
            console.log(awayCoeff);
            if(err){
                console.log(err);
            } else{
                console.log(createdMatch);
            }
            return createdMatch;
        });
    })
    
    

    

    //async.parallel([], function(){return;});
}
