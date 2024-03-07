var express = require('express');
var router = express.Router();
const Contact = require('../Contact');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Database Application' });
});

router.get('/contacts', function(req, res, next) {
  Contact.readContacts()
    .then(contacts => {
      res.render('contacts', { title: 'All Contacts', contacts });
    })
    .catch(err => {
      console.error('Error reading contacts:', err);
      res.redirect('/');
    });
});

router.get('/contacts/:id', function(req, res, next) {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.render('contact-detail', { title: 'Contact Detail', contact });
      } else {
        res.redirect('/contacts');
      }
    })
    .catch(err => {
      console.error('Error finding contact:', err);
      res.redirect('/contacts');
    });
});

router.get('/contacts/new', function(req, res) {
  res.render('create-contact', { title: 'Create Contact' });
});

router.post('/contacts', function(req, res) {
  const newContact = new Contact(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.notes
  );
  newContact.save();
  res.redirect('/contacts');
});

router.get('/contacts/:id/edit', function(req, res) {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.render('edit-contact', { title: 'Edit Contact', contact });
      } else {
        res.redirect('/contacts');
      }
    })
    .catch(err => {
      console.error('Error finding contact:', err);
      res.redirect('/contacts');
    });
});

router.post('/contacts/:id', function(req, res) {
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    notes: req.body.notes,
    dateCreated: new Date().toISOString()
  };
  Contact.updateById(req.params.id, updatedContact)
    .then(() => {
      res.redirect('/contacts');
    })
    .catch(err => {
      console.error('Error updating contact:', err);
      res.redirect('/contacts');
    });
});

router.post('/contacts/:id/delete', function(req, res) {
  Contact.deleteById(req.params.id)
    .then(() => {
      res.redirect('/contacts');
    })
    .catch(err => {
      console.error('Error deleting contact:', err);
      res.redirect('/contacts');
    });
});

module.exports = router;