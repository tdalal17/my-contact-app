
var express = require('express');
var router = express.Router();
const Contact = require('../Contact');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Database Application' });
});


router.get('/contacts', function(req, res, next) {
  const contacts = Contact.readContacts();
  res.render('contacts', { title: 'All Contacts', contacts });
});


router.get('/contacts/:id', function(req, res, next) {
  const contacts = Contact.readContacts();
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (contact) {
    res.render('contact-detail', { title: 'Contact Detail', contact });
  } else {
    res.redirect('/contacts');
  }
});

// GET request to display the form for creating a new contact
router.get('/contacts/new', function(req, res) {
  res.render('create-contact', { title: 'Add New Contact' });
});

router.post('/contacts', function(req, res) {
  const newContact = new Contact(req.body.firstName, req.body.lastName, req.body.email, req.body.notes);
  newContact.save();
  res.redirect('/contacts');
});

router.get('/contacts/:id/edit', function(req, res) {
  const contact = Contact.findById(parseInt(req.params.id));
  if (contact) {
    res.render('edit-contact', { title: 'Edit Contact', contact });
  } else {
    res.redirect('/contacts');
  }
});

module.exports = router;
