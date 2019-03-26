var express = require("express");
var router = express.Router();
var Models = require("../models/index");
var bodyParser = require("body-parser");
var controllers = require("../controllers/index")

router.get('/:id', (req, res) => {
    fetchTeam(req.params.id).then(content => {
        fetchFixtures(content.team._id).then(fixtures => {
            res.render("./teams/team.ejs", {
                team: content.team,
                players: content.players,
                fixtures: fixtures
            });
        });
    });
});

async function fetchFixtures(id) {
    return await controllers.Team.getTeamFixtures(id);
}

async function fetchTeam(id) {
    var team = await Models.Team.findById(id);
    var players = await Models.Player.find({
        "_id": {
            $in: team.players
        }
    });
    return {
        team: team,
        players: players
    };
}


module.exports = router;