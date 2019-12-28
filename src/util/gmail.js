const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';

var oauth2Client;

(function () {
  fs.readFile('credentials.json', (err, content) => {
    if (err) console.log('Error loading client secret file:', err);
    const { client_id, client_secret, redirect_uri } = JSON.parse(content).installed;

    console.log('Create Google OAuth');
    oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );
  })
})();

const listMessages = async () => {
  fs.readFile(TOKEN_PATH, (err, content) => {
    if (err) console.log('Error loading client token file:', err);

    oauth2Client.setCredentials({
      refresh_token: JSON.parse(content).refresh_token
    });

    const gmail = google.gmail({
      version: 'v1',
      auth: oauth2Client
    });

    res = gmail.users.messages.list({ userId: 'me' });

    return res.data;
  });
}

module.exports = {
  listMessages,
}