const fs = require('fs');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

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

const url = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
}

const createToken = (code) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log('Token stored to', TOKEN_PATH);
    });
  });
}

module.exports = {
  url,
  createToken
}