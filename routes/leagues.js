var express = require("express");
var router = express.Router();
var Models = require("../models/index");
var controllers = require("../controllers/index");
var bodyParser = require("body-parser");

router.get('/:id/playLeagueMatch', (req, res) => {
    var id = req.params.id;
    playLeagueMatch(id).then(league => {
        res.render("./matches/playMatch.ejs", {teams:league.teams});
    })
});

router.get('/:id', (req, res) => {
    fetchLeague(req.params.id).then(content => {
        res.render("./leagues/league.ejs", content);
    })
});

router.get('/:id/simulateSeason', (req,res) =>{
    controllers.Season.simulateSeason(req.params.id).then( l => {
    res.redirect('/leagues/' + req.params.id)
    });
});

router.get('/:id/newSeason', (req,res) =>{
    controllers.League.newSeason(req.params.id).then( l => {
        res.redirect('/leagues/' + req.params.id)
    });
});

async function playLeagueMatch(league){
    var l = await controllers.League.getLeague(league);
    return l;
}

async function fetchLeague(id) {
    var league = await Models.league.findById(id);
    var matches = await Models.Match.find({
        "_id": {
            $in: league.matches
        }
    });
    var matchObjects = await controllers.Match.getLeagueMatches(league)
    var teams = await Models.Team.find({
        "_id": {
            $in: league.teams
        }
    });
    var table = generateLeagueTable(teams,matches);
    return {
        matches: matchObjects,
        teams: teams,
        table : table,
        leagueId : id
    };
}


function generateLeagueTable(teams,matches){
    var table = [];
    for(var i = 0; i < teams.length; i++){
        var t = {};
        t.wins = 0;
        t.losses = 0;
        t.draws = 0;
        t.points = 0;
        t.gp = 0;
        t.gd = 0;
        t.name = teams[i].name;
        t.id = teams[i]._id;
        table.push(t);
    }

    for(var x = 0; x < matches.length; x++){
        var homeTeam = table.find(t => {
            console.log("t:" + t.id);
            console.log("m:" + matches[x].homeTeam);
            console.log(t.id.toString() == matches[x].homeTeam.toString());
            return t.id.toString() == matches[x].homeTeam.toString();
        });
        var awayTeam = table.find(t => {
            return t.id.toString() == matches[x].awayTeam.toString();
        });
        homeTeam.gp += 1;
        awayTeam.gp += 1; 
        homeTeam.gd += matches[x].homeGoals - matches[x].awayGoals;
        awayTeam.gd += matches[x].awayGoals - matches[x].homeGoals;

        if(matches[x].result === "Home"){
            homeTeam.wins += 1;
            homeTeam.points += 3;
            awayTeam.losses += 1;
        }
        if(matches[x].result === "Away"){
            awayTeam.wins += 1;
            awayTeam.points += 3;
            homeTeam.losses += 1;
        }
    }
    table.sort( function(a,b){
        return b.points - a.points;
    });
    return table;
}
module.exports = router;