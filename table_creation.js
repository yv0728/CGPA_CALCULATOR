const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("cgpa.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT,
            cgpa REAL,
            arrears INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("Tables created. Insert your semester subjects here.");
});

db.close();