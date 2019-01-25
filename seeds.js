var mongoose = require("mongoose");
var Player = require("./models/player");
var Team = require("./models/team");
var faker = require("faker");

var teamOne = {name: "Sporting Enkelman", city: "Enk City"};
var teamTwo = {name: "Enkelman FC", city: "Enkopolis"};

var postions = ["GK", "DEF", "MID", "ATT"]
var playersOne = [];
for(var i = 0; i < 11; i++){
    var p = {};
    p.name = faker.name.findName()
    p.age = 22;
    p.att = Math.random * 5
    p.def = Math.random * 5
    p.mid = Math.random * 5
    p.position = postions[(Math.ceil( Math.random * 3))];
    playersTwo.push(p);
}

var playersTwo = [];
for(var i = 0; i < 11; i++){
    var p = {};
    p.name = faker.name.findName()
    p.age = 22;
    p.att = Math.random * 5
    p.def = Math.random * 5
    p.mid = Math.random * 5
    p.position = postions[(Math.ceil( Math.random * 3))];
    playersTwo.push(p);
}
Team.create(teamOne, function(err, newTeam){
    if(err){
        console.log(err);
    } else{
        console.log(newTeam);
        playersOne.forEach(function(player){
            Player.create(player, function(err, newPlayer){ 
                if(err){
                    console.log(err);
                } else{
                    console.log(newPlayer);
                    newTeam.players.push(newPlayer);
                    newTeam.save();
                }
            })
        });
    }
});
Team.create(teamTwo, function(err, newTeam){
    if(err){
        console.log(err);
    } else{
        console.log(newTeam);
        playersTwo.forEach(function(player){
            Player.create(player, function(err, newPlayer){ 
                if(err){
                    console.log(err);
                } else{
                    console.log(newPlayer);
                    newTeam.players.push(newPlayer);
                    newTeam.save();
                }
            })
        });
    }
});



