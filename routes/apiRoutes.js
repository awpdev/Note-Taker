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

  //
  app.post('/api/notes', function(req, res) {

    let newNote = req.body;
    if (notesObj.length === 0) newNote.id = '0';
    else {
      newNote.id = (parseInt(notesObj[notesObj.length - 1].id) + 1).toString();
    }
    notesObj.push(newNote);
    console.log(`Created note with id ${newNote.id}`);
        
    fs.writeFileSync("./db/db.json", JSON.stringify(notesObj), (err) => {
      if (err) throw (err);    
    }); 
    res.json(notesObj);    
  });

  // delete a saved note by id
  app.delete('/api/notes/:id', function(req, res) {

    notesObj = notesObj.filter(notes => {
      return notes.id != req.params.id;
    });
    console.log(`Deleted note with id ${req.params.id}`); 
    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj), (err) => {
      if (err) throw err;
    });
    res.json(notesObj);
  }); 
}








/*
//const express = require("express");
//const app = express();
const fs = require("fs");
let notes = JSON.parse(fs.readFileSync("../db/db.json", "utf-8"));

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

module.exports = function(app) {

  app.get("/api/notes", (req, res) => {
    return res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    if (notes.length === 0) {
      newNote.id = 1;
    } else {
      newNote.id = notes[notes.length - 1].id;
    }

    console.log(newNote);
    notes.push(newNote);
    //res.json(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(notes), function(err) {
      if (err) throw err;
      console.log(`Successfully added note id: ${newNote.id}`);
    })
    res.json(notes);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    
    notes.forEach((note, index) => {
      if (id === note.id) {
        notes.splice(index, 1);
        const jsonN
      }
    })
    fs.writeFile("../db/db.json", JSON.stringify(newNote, null, 2), (err) => {
      if (err) throw err;
      console.log(`Successfully deleted note id: ${id}`);
    })
    res.json(true);
  }); 
}; 
*/