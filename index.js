var mongoose = require("mongoose");
var app = require("express");
mongoose.connect("mongodb://localhost:27017/studsupDEV", { useNewUrlParser: true });
var seed = require("./seeds");
var Team = require("./models/team")
//seed();


var MatchController = require("./controllers/match")
Team.find({}, function(err,foundTeams){
    MatchController.playMatch(foundTeams[0], foundTeams[1]);
});