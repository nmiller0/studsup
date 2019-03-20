var express = require("express");
var router = express.Router();
var Models = require("../models/index");
var bodyParser = require("body-parser");

router.get('/:id', (req, res) => {
    fetchTeam(req.params.id).then(content => {
        res.render("./teams/team.ejs", content);
    }
)});

async function fetchTeam(id){
    var team = await Models.Team.findById(id);
    var players = await Models.Player.find({
        "_id": {
            $in: team.players
        }
    });
    return {team:team, players:players};
}


module.exports = router;