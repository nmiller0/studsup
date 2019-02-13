var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studsupDEV", {
    useNewUrlParser: true
});
var seed = require("./seeds");
var Team = require("./models/team")
//seed();


var MatchController = require("./controllers/match")

app.get('/matchDemo', (req, res) => {
    Team.find({}, function (err, foundTeams) {
        MatchController.playMatch(foundTeams[0],foundTeams[1], renderMatch, res);
    });
});

function renderMatch(match,res){
    console.log("Rendering...");
    console.log(match);
    res.render('match.ejs', {
        match: match,
    });
}
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!');
});