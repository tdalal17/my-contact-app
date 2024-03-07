
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data', 'contacts.json');
const db = require('./database');

class Contact {
  constructor(firstName, lastName, email, notes) {
    this.id = Contact.generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email || '';
    this.notes = notes || '';
    this.dateCreated = new Date();
  }


  static generateId() {
    
    return Date.now();
  }

  static readContacts() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) AS count FROM contacts';
      db.get(sql, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row.count === 0) {
            const existingContacts = [
              {
                "id": 1,
                "firstName": "Moti",
                "lastName": "Kon",
                "email": "Moti.Kno@example.com",
                "notes": "Sample note about Moti.",
                "dateCreated": "2024-02-21T21:00:00.404Z"
              }
            ];
            Contact.insertExistingContacts(existingContacts)
              .then(() => {
                resolve(existingContacts);
              })
              .catch(err => {
                reject(err);
              });
          } else {
            const sql = 'SELECT * FROM contacts';
            db.all(sql, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
          }
        }
      });
    });
  }

  static findById(contactId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM contacts WHERE id = ?';
      db.get(sql, [contactId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  save() {
    const sql = `
      INSERT INTO contacts (firstName, lastName, email, notes, dateCreated)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [this.firstName, this.lastName, this.email, this.notes, this.dateCreated];
    db.run(sql, values);
  }

  static updateById(contactId, updateData) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE contacts
        SET firstName = ?, lastName = ?, email = ?, notes = ?, dateCreated = ?
        WHERE id = ?
      `;
      const values = [
        updateData.firstName,
        updateData.lastName,
        updateData.email,
        updateData.notes,
        updateData.dateCreated,
        contactId
      ];
      db.run(sql, values, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
    static deleteById(contactId) {
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM contacts WHERE id = ?';
        db.run(sql, [contactId], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    
    }
    static insertExistingContacts(contacts) {
      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO contacts (id, firstName, lastName, email, notes, dateCreated)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const insertPromises = contacts.map(contact => {
          return new Promise((resolve, reject) => {
            db.run(sql, [contact.id, contact.firstName, contact.lastName, contact.email, contact.notes, contact.dateCreated], (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        });
        Promise.all(insertPromises)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
module.exports = Contact;
