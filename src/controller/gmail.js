const express = require('express');
const router = express.Router();

const fs = require('fs');

const oauth = require('../util/oauth');

/**
 * '/gmail'
 */

router.get('/labels', (req, res) => {
  fs.readFile('credentials.json', (err, content) => {
    if(err) res.send('Error loading client secret file:', err);
    oauth.authorize(JSON.parse(content), oauth.listLabels2);
  })
});

module.exports = router;