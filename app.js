const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

var login = require('./src/controller/login');
var gmail = require('./src/controller/gmail');

app.use('/login', login);
app.use('/gmail', gmail);

app.get('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream("./index.html").pipe(res);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))