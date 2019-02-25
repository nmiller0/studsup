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
    if (!name) {
        name = faker.name.findName();
    }
    if (!position) {
        position = postions[(Math.floor(Math.random() * 4))];
    }
    if (!age) {
        age = 16 + Math.floor(Math.random() * 20);
    }
    if (!tier) {
        tier = Math.floor(Math.random() * 5);
    }
    var p = {};
    p.name = name;
    p.age = age;
    p.att = Math.random() * tier;
    p.def = Math.random() * tier;
    p.mid = Math.random() * tier;
    p.gk = Math.random() * tier;
    p.position = position;
    var promise = models.Player.create(p); 
    return promise;   
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