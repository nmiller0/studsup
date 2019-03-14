var faker = require("faker");
var models = require("../models/index");
var playerController = require("./player");
module.exports.getTeamObjects = async function(home, away){
    var homeObject = await models.Team.find({"_id":home});
    var awayObject = await models.Team.find({"_id":away});
    return [homeObject,awayObject];
}
module.exports.createTeam = async function (name = null, players = null, tier = null, league = null) {
    if (!players) {
        players = await playerController.createTeamPlayers(tier);
    }
    var city = faker.address.city();
    if(!name){
        name = city + " United";
    }
    var team = {
        city: city,
        name: name,
        players: players,
        league: league
    };
    var promise = models.Team.create(team);
    return promise;
};