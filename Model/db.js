var mongoose = require("mongoose")
var dbsetting = require("../dbsettings");


module.exports = mongoose.connect(dbsetting.URI);