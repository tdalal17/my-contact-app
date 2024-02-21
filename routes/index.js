
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



module.exports = router;
