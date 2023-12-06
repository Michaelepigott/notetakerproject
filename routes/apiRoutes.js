const app = require('express').Router();
const fs = require('fs');
const path = require("path");

//this package will be used to generate our unique ids.
var uniqid = require('uniqid');
//
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, "../db/db.json"));
});
//Create note and post it to db
app.post("/notes", (req,res) =>{
  let db = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  db = JSON.parse(db);
  let userNote ={
    title: req.body.title,
    text: req.body.text,
//add id
     id: uniqid()
  };

  db.push(userNote);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));
  res.json(db);
});

//Remove note from db by ID
app.delete("/notes/:id", (req, res) => {
  //reading notes from db.json
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  // removing note with id
  let deleteNotes = db.filter((item) => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = app;