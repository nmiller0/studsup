var faker = require("faker");
var postions = ["GK", "DEF", "MID", "ATT"];
var models = require("../models/index");

var attMultipliers = {
    att : 1.5,
    mid : 1.0,
    def : .6,
    gk : .25
}
var midMultipliers = {
    att : 1.0,
    mid : 1.3,
    def : 1.0,
    gk : .25
}
var defMultipliers = {
    att : .6,
    mid : 1.0,
    def : 1.3,
    gk : .35
}
var gkMultipliers = {
    att : .5,
    mid : .5,
    def : .75,
    gk : 1.3
}
function getMultipliers(pos){
    if(pos.toLowerCase() === "att"){
        return attMultipliers;
    }
    if(pos.toLowerCase() === "mid"){
        return midMultipliers;
    }
    if(pos.toLowerCase() === "def"){
        return defMultipliers;
    }
    if(pos.toLowerCase() === "gk"){
        return gkMultipliers;
    }
}
module.exports.createNewPlayer = async function (name = null, position = null, age = null, tier = null) {
    var multipliers = getMultipliers(position);
    var p = {};
    p.att = (Math.random() * tier) * multipliers.att;
    p.def = (Math.random() * tier) * multipliers.def;
    p.mid = (Math.random() * tier) * multipliers.mid;
    p.gk = (Math.random() * tier) * multipliers.gk;
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

async function genPartialSquad(pos, num, tier){
    var players = [];
    for(var i = 0; i < num; i++){
        var newPlayer = await module.exports.createNewPlayer(null, pos, null, tier);
        players.push(newPlayer);
    }
    return players;
}
// This will require a lot of stuff. Probably multipliers for attributes by position? 
// basically replacing the find best position thingy
module.exports.createTeamPlayers = async function (tier = null) {
    
    var gks = await genPartialSquad("gk",3,tier);
    var defs = await genPartialSquad("def",7,tier);
    var mid = await genPartialSquad("mid",7,tier);
    var att = await genPartialSquad("att",7,tier);

    var players =  gks.concat(defs,mid,att);
    return players;
};

//NOTE TO SELF: RETURNING PROMISES IS DEFINITELY A THING;