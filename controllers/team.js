// name: String,
//     city: String,
//     sponsors: [{type: mongoose.Schema.Types.ObjectId, ref:"sponsor"}],
//     players: [{type: mongoose.Schema.Types.ObjectId, ref:"player"}],
//     league: mongoose.Schema.Types.ObjectId
var models = require("../models/index");
var playerController = require("./player");
module.exports.createTeam = async function (name, players = null, tier = null) {
    if (!players) {
        players = await playerController.createTeamPlayers(tier);
    }
    var team = {
        name: name,
        players: players
    };
    var promise = models.Team.create(team);
    return promise;
};