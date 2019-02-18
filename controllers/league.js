var models = require("../models/index");
var teamController = require("./team");

module.exports.createLeague = async function(name = null, team = null, tier = null){
    var teams = [];
    var numTeamsToGen = 20;
    if(team){
        teams.push(team);
        numTeamsToGen--;
    }
    for(var i = 0; i < numTeamsToGen; i++){
        var newTeam = await teamController.createTeam("Test Team", null, tier);
        teams.push(newTeam);
    }
    var l = {name:name, teams:teams, tier:tier};
    console.log(l);
    var league = models.league.create(l);
    return league;
}

// playLeagueMatch