var express = require("express");
var router = express.Router();
var models = require("../models/index");
var bodyParser = require("body-parser");

router.get('/new', (req, res) => {
        res.render("./users/new.ejs");
});

router.post('/', (req, res) => {
    console.log("POST SENT");
    var chair = {name: req.body.name};
    var team = {name: req.body.teamName};
    console.log(team);
    console.log(chair);
});


module.exports = router;