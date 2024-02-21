
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data', 'contacts.json');

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
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static writeContacts(contacts) {
    
    try {
      fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2), 'utf8');
    } catch (error) {
      throw new Error('Error writing to the data file.');
    }
  }

  static findById(contactId) {
    
    const contacts = Contact.readContacts();
    return contacts.find(contact => contact.id === contactId);
  }

  save() {
   
    const contacts = Contact.readContacts();
    contacts.push(this);
    Contact.writeContacts(contacts);
  }

  static updateById(contactId, updateData) {
    
    const contacts = Contact.readContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) return null;

    
    contacts[contactIndex] = {...contacts[contactIndex], ...updateData, dateCreated: new Date()};
    Contact.writeContacts(contacts);
    return contacts[contactIndex];
  }
  static deleteById(contactId) {
    let contacts = Contact.readContacts();
    contacts = contacts.filter(contact => contact.id !== contactId);
    Contact.writeContacts(contacts);
  }
}

module.exports = Contact;
