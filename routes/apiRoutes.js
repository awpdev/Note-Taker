const fs = require('fs');
var notesObj = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

module.exports = function(app) {
  // retrieve all saved notes
  app.get('/api/notes', function(req, res) { 
    res.json(notesObj);
  });

  // retrieve a saved note by id
  app.get('/api/notes/:id', function(req, res) {
    res.json(notesObj[req.params.id]);
  });

  // Adds new note to json file
  app.post('/api/notes', function(req, res) {

    let newNote = req.body;
    if (notesObj.length === 0) newNote.id = '0';
    else {
      // assign new note the id plus one the highest existing id
      newNote.id = (parseInt(notesObj[notesObj.length - 1].id) + 1).toString();
    }
    notesObj.push(newNote);
    //console.log(`Created note with id ${newNote.id}`);
    // update json file
    fs.writeFileSync("./db/db.json", JSON.stringify(notesObj), (err) => {
      if (err) throw (err);    
    }); 
    res.json(notesObj);    
  });

  // delete a saved note by id
  app.delete('/api/notes/:id', function(req, res) {
    // return note json minus the specific note
    notesObj = notesObj.filter(notes => {
      return notes.id != req.params.id;
    });
    //console.log(`Deleted note with id ${req.params.id}`);
    // update json file
    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj), (err) => {
      if (err) throw err;
    });
    res.json(notesObj);
  }); 
}