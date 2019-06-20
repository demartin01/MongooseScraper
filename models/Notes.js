var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var NoteSchema = new Schema({
    title: String, 
    body: String, 
});

var Notes = mongoose.model("Note", NoteSchema);

module.exports = Notes;