const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SANJOAN@0127', 
    database: 'Kindness_db'
});

app.post('/add', (req, res) => {
    db.query("INSERT INTO notes (content) VALUES (?)", [req.body.content], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Saved!");
    });
});

app.get('/notes', (req, res) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3001, () => console.log("Server at 3001"));