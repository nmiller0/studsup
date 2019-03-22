var mongoose = require("mongoose");
var fixtureSchema = new mongoose.Schema ({
    date: Date,
    homeTeam: mongoose.Schema.Types.ObjectId,
    awayTeam: mongoose.Schema.Types.ObjectId,
    league: mongoose.Schema.Types.ObjectId,
    season: mongoose.Schema.Types.ObjectId
});

var Fixture = mongoose.model('fixture',fixtureSchema);

module.exports = Fixture; 