const notes = require("../db/db.json");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    /*
    let newNote = req.body;
    newNote.
    console.log(newNote);
    notes.push(newNote); */
  });

  app.delete("/api/notes/:id", function(req, res) {

  });
};