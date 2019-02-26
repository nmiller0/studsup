var express = require("express");
var router = express.Router();
var Models = require("../models/index");
//var controllers = require("../controllers/index");
var bodyParser = require("body-parser");

router.get('/:id', (req, res) => {
    fetchLeague(req.params.id).then(content => {
        res.render("./leagues/league.ejs", content);
    })
});

async function fetchLeague(id) {
    var league = await Models.league.findById(id);
    var matches = await Models.Match.find({
        "_id": {
            $in: league.matches
        }
    });
    var teams = await Models.Team.find({
        "_id": {
            $in: league.teams
        }
    });
    return {
        matches: matches,
        teams: teams
    };
}
module.exports = router;