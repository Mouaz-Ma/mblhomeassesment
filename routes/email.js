const express = require('express');
const router = express.Router();
const emails = require('../controllers/emails');

// get number of mails for the home page
router.route('/')
    .get(emails.index)

// get all emails
router.route('/mailList')
    .get(emails.mailList)


router.route('/new')
.post(emails.createEmail)



router.route('/:id')
    .get(emails.showEmail)
    .put(emails.updateEmail)
    .delete(emails.deleteEmail);

module.exports = router;