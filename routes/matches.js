var express = require("express");
var router = express.Router();
var Models = require("../models/index");
var controllers = require("../controllers/index");
var bodyParser = require("body-parser");

router.get('/playMatchDemo', (req, res) => {
    playMatchDemo().then(teams => {
        res.render("./matches/playMatch.ejs", {teams:teams});
    })
});

router.get('/playLeagueMatch', (req, res) => {
    playLeagueMatch(req.body.league).then(league => {
        res.render("./matches/playMatch.ejs", {teams:league.teams});
    })
});
async function playLeagueMatch(league){
    var l = controllers.League.getLeague(league);
    return l;
}

router.post('/', (req, res) => {
    controllers.Team.getTeamObjects(req.body.homeTeam, req.body.awayTeam).then(teams => {
        controllers.League.playLeagueMatch(teams[0][0],teams[1][0]).then(match =>{
            console.log("Match Created:");
            console.log(match);
            res.redirect("/matches/"+match._id);
        });
    });
});



async function playMatchDemo(){
    var leagues = await Models.league.find({});
    var teams = await Models.Team.find({
        "_id":{
            $in: leagues[0].teams
        }
    });    
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
    console.log(match);
    // match creation issue??
    var homeTeam = await Models.Team.findById(match.homeTeam);
    var awayTeam = await Models.Team.findById(match.awayTeam);
    var homeTeamPlayers = await Models.Player.find({
        "_id": {
            $in: homeTeam.players
        }
    }).catch(err => {
        console.log(err);
    });
    var awayTeamPlayers = await Models.Player.find({
        "_id": {
            $in: awayTeam.players
        }
    });
    return {
        match: match,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeTeamPlayers: homeTeamPlayers,
        awayTeamPlayers: awayTeamPlayers
    };
}
module.exports = router;