const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./thworks.db", (err) => {
    if(err) console.error("Database Connection failed: ",err.message);
    else console.log("Sql Database Connected");
});

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
    )
`)

db.run(`CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now','localtime'))
    )
`)

module.exports = db;