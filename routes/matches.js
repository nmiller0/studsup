var express = require("express");
var router = express.Router();
var Models = require("../models/index");
//var controllers = require("../controllers/index");
var bodyParser = require("body-parser");

router.get('/:id', (req, res) => {
    fetchMatch(req.params.id).then(content => {
        res.render("./matches/match.ejs", content);
    })
});

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