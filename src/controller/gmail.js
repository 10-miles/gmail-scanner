const express = require('express');
const router = express.Router();

const oauth = require('../util/oauth');

/**
 * '/gmail'
 */

router.get('/labels', async (req, res) => {
  const labels = await oauth.authorize(oauth.listLabels);
  res.send(labels);
});

router.get('/list', async (req, res) => {
  const list = await oauth.authorize(oauth.listMessages);
  res.send(list);
});

router.get('/messages', async (req, res) => {
  const messages = await oauth.authorize(oauth.getMessages);
  res.send(messages);
});

module.exports = router;