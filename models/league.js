var mongoose = require("mongoose");
var leagueSchema = new mongoose.Schema ({
    name: String,
    size: String,
    tier: Number,
    teams: [{type: mongoose.Schema.Types.ObjectId, ref:"team"}],
    matches: [{type: mongoose.Schema.Types.ObjectId, ref:"match"}],
    seasons: [{type: mongoose.Schema.Types.ObjectId, ref:"season"}]
});

var League = mongoose.model('League',leagueSchema);

module.exports = League; 
