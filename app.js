const express = require('express')
const app = express()
const port = 3000

var login = require('./src/controller/login');
var gmail = require('./src/controller/gmail');

app.use('/login', login);
app.use('/gmail', gmail);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))