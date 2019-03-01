var express = require("express");
var router = express.Router();
var Models = require("../models/index");
//var controllers = require("../controllers/index");
var bodyParser = require("body-parser");
var controllers = require("../controllers/index");

router.get('/playMatchDemo', (req, res) => {
    playMatchDemo().then(teams => {
        res.render("./matches/playMatch.ejs", {teams:teams});
    })
});

async function playMatchDemo(){
    var leagues = await Models.league.find({});
    var teams = await Models.Team.find({
        "_id":{
            $in: leagues[0].teams
        }
    });
    //console.log(teams);
    
    return teams;
}

router.get('/:id', (req, res) => {
    fetchMatch(req.params.id).then(content => {
        res.render("./matches/match.ejs", content);
    })
});

router.get('/matchDemo', (req, res) => {  
    matchDemoFn().then(teams => {
        controllers.League.playLeagueMatch(teams.homeTeam,teams.awayTeam).then(match => {
            teams.match = match;
            res.render("./matches/match.ejs", teams);
        })
    })
});

async function matchDemoFn(){
    var teams = await Models.Team.find({});
    var homeTeamPlayers = await Models.Player.find({
        "_id": {
            $in: teams[0].players
        }
    });
    var awayTeamPlayers = await Models.Player.find({
        "_id": {
            $in: teams[1].players
        }
    });
    return {homeTeam:teams[0],awayTeam:teams[1],homeTeamPlayers:homeTeamPlayers,awayTeamPlayers:awayTeamPlayers};
}
async function fetchMatch(id) {
    var match = await Models.Match.findById(id);
    var homeTeam = await Models.Team.findById(match.homeTeam);
    var awayTeam = await Models.Team.findById(match.awayTeam);
    var homeTeamPlayers = await Models.Player.find({
        "_id": {
            $in: homeTeam.players
        }
    });
    var awayTeamPlayers = await Models.Player.find({
        "_id": {
            $in: awayTeam.players
        }
    });
    return {
        match: match,
        homeTeam: homeTeam,
        awayTeam: homeTeam,
        homeTeamPlayers: homeTeamPlayers,
        awayTeamPlayers: awayTeamPlayers
    };
}
module.exports = router;