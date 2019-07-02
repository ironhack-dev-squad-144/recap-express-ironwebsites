const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
  name: String, 
  url: String, 
  nbOfVotes: { type: Number, default: 0 } 
});

const Website = mongoose.model("Website", websiteSchema);
module.exports = Website;


