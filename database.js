const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'data', 'contacts.db');
const db = new sqlite3.Database(dbPath);

function createContactsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      notes TEXT,
      dateCreated TEXT
    )
  `;
  db.run(sql);
}

createContactsTable();

module.exports = db;