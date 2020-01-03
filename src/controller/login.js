const express = require('express')
const router = express.Router();

const oauth = require('../util/oauth');

/**
 * url : '/login'
 */

router.get('/', (req, res) => {
  res.redirect(oauth.url());
});

router.get('/certification', function (req, res) {
  const code = req.query.code;

  oauth.createToken(code);

  res.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream("./index.html").pipe(res);
})

module.exports = router;

