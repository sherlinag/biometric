const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/devices.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS device_auth (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    username TEXT,
    password TEXT,
    response TEXT
  )`);
});

module.exports = db;
