var mongoose = require("mongoose");
var Player = require("./models/player");
var Team = require("./models/team");
var faker = require("faker");


var teamOne = {name: "Sporting Enkelman", city: "Enk City"};
var teamTwo = {name: "Enkelman FC", city: "Enkopolis"};

var postions = ["GK", "DEF", "MID", "ATT"]
var playersOne = [];
for(var i = 0; i < 15; i++){
    var p = {};
    p.name = faker.name.findName()
    p.age = 22;
    p.att = Math.random() * 5;
    p.def = Math.random() * 5;
    p.mid = Math.random() * 5;
    p.position = postions[(Math.floor( Math.random() * 4))];
    playersOne.push(p);
}

var playersTwo = [];
for(var i = 0; i < 15; i++){
    var p = {};
    p.name = faker.name.findName()
    p.age = 22;
    p.att = Math.random() * 5
    p.def = Math.random() * 5
    p.mid = Math.random() * 5
    p.position = postions[(Math.floor( Math.random() * 4))];
    playersTwo.push(p);
}
var players2Mongoose = [];
playersTwo.forEach(function(player){
    Player.create(player, function(err, newPlayer){ 
        if(err){
            console.log(err);
        } else{
            //console.log(newPlayer);
            players2Mongoose.push(newPlayer);
        }
    });
});

var players1Mongoose = [];
playersOne.forEach(function(player){
    Player.create(player, function(err, newPlayer){ 
        if(err){
            console.log(err);
        } else{
            players1Mongoose.push(newPlayer);
        }
    });
});
function seedDB(){
    teamOne.players = players1Mongoose;
    teamTwo.players = players2Mongoose;
    Team.create(teamOne, function(err, newTeam){
        if(err){
            console.log(err);
        } else{
            console.log(newTeam);
            Player.find({}, function(err, players){
                var onePlayers = players.slice(0,11);
                console.log(onePlayers.length);
                onePlayers.forEach(function(player){
                    newTeam.players.push(player);
                });
                newTeam.save();
            });
        }
    });
    Team.create(teamTwo, function(err, newTeam){
        if(err){
            console.log(err);
        } else{
            console.log(newTeam);
            Player.find({}, function(err, players){
                var onePlayers = players.slice(12,23);
                console.log(onePlayers.length);
                onePlayers.forEach(function(player){
                    newTeam.players.push(player);
                });
                newTeam.save();
            });
        }
    });
};

module.exports = seedDB;


