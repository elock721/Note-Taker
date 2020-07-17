const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

// checking to see process.env exists, if not default to 3000
const PORT = process.env.PORT || 3000;

// middleware setup 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//  GET /api/notes 
app.get('/api/notes', function(req,res){
    let rawdata = fs.readFileSync('db/db.json');
    let notes = JSON.parse(rawdata);
    return res.send(notes);
});

// POST /api/notes 
app.post('/api/notes', function(req, res){
    console.log(req.body);
    const title = req.body.title;
    const text = req.body.text;
    if (!title || !text) {
        return res.status(400).send({"err":"Invalid note submitted"});
    }
    let rawdata = fs.readFileSync('db/db.json');
    let notes = JSON.parse(rawdata);
    let id;
    if (notes.length === 0) {
        id = 1;
    } else {
        let max = 0;
        notes.forEach(function(note) {
            if (note.id > max) {
                max = note.id;
            }
        });
        id = max + 1;
    }
    notes.push({ id, title, text});
    rawdata = JSON.stringify(notes);
    fs.writeFileSync('db/db.json', rawdata);
    return res.send({title, text});
});


// DELETE /api/notes
app.delete('/api/notes/:id', function(req, res){
    let id = parseInt(req.params.id);
    let rawdata = fs.readFileSync('db/db.json');
    let notes = JSON.parse(rawdata);
    notes = notes.filter(note => note.id !== id);
    console.log(notes);
    rawdata = JSON.stringify(notes);
    fs.writeFileSync('db/db.json', rawdata);
    return res.send({msg:"Note deleted"});
})

// serves the notes.html file
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// serves the index.html file (wildcard)
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// starting the server
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));