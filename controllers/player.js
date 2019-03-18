var faker = require("faker");
var postions = ["GK", "DEF", "MID", "ATT"];
var models = require("../models/index");

module.exports.genNewPlayer = function () {
    var p = {};
    p.name = faker.name.findName();
    p.age = 22;
    p.att = Math.random() * 5;
    p.def = Math.random() * 5;
    p.mid = Math.random() * 5;
    p.position = postions[(Math.floor(Math.random() * 4))];
    var promise = models.Player.create(p);
    return promise;
};

module.exports.createNewPlayer = async function (name = null, position = null, age = null, tier = null) {
    var p = {};
    p.att = Math.random() * tier;
    p.def = Math.random() * tier;
    p.mid = Math.random() * tier;
    p.gk = Math.random() * tier;
    if (!name) {
        name = faker.name.findName();
    }
    if (!position) {
        position = findBestPosition(p);
    }
    if (!age) {
        age = 16 + Math.floor(Math.random() * 20);
    }
    if (!tier) {
        tier = Math.floor(Math.random() * 5);
    }
    p.name = name;
    p.age = age;
    p.position = position;
    var promise = models.Player.create(p); 
    return promise;   
}

function findBestPosition(p){
    var highest = p.gk;
    var highestPos = "gk";
    if(p.att > highest){
        highest = p.att;
        highestPos = "att";
    }
    if(p.def > highest){
        highest = p.def;
        highestPos = "def";
    }
    if(p.mid > highest){
        highest = p.mid;
        highestPos = "mid";
    }
    return highestPos
}


function createGoalkeeper(tier = null) {
    return module.exports.createNewPlayer(null, "GK", null, tier);
}

module.exports.createTeamPlayers = async function (tier = null) {
    var players = [];
    for (var i = 0; i < 24; i++) {
        var newPlayer = await module.exports.createNewPlayer(null, null, null, tier);
        players.push(newPlayer);
    }
    return players;
};

//NOTE TO SELF: RETURNING PROMISES IS DEFINITELY A THING;