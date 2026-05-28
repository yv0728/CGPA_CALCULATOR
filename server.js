const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("cgpa.db");

// Save result API
app.post("/save-result", (req, res) => {
    const { studentName, cgpa, arrears } = req.body;

    const sql = `
        INSERT INTO results (student_name, cgpa, arrears)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [studentName, cgpa, arrears], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Result saved", id: this.lastID });
    });
});

// API: fetch subjects per semester (optional)
app.get("/subjects/:semester", (req, res) => {
    const semester = req.params.semester;

    db.all(
        "SELECT subject_name, credit FROM semester_subjects WHERE semester = ?",
        [semester],
        (err, rows) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json(rows);
        }
    );
});

app.listen(5000, () => console.log("SQLite server running on port 5000"));
