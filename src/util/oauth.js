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

const authorize = (callback) => {
  const token = fs.readFileSync(TOKEN_PATH);

  oauth2Client.setCredentials(JSON.parse(token));

  return callback(oauth2Client);
}

const listLabels = async (auth) => {
  const gmail = google.gmail({ version: 'v1', auth });

  return await gmail.users.labels.list({ userId: 'me' });
}

const listMessages = async (auth) => {
  const gmail = google.gmail({ version: 'v1', auth });

  return await gmail.users.messages.list({ userId: 'me' });
}

const getMessages = async (auth) => {
  const gmail = google.gmail({ version: 'v1', auth });

  const list = await gmail.users.messages.list({ userId: 'me' });

  const result = Promise.all(
    list.data.messages.map((message) => {
      const mail = gmail.users.messages.get({ 'userId': 'me', 'id': message.id });

      return mail;
    })
  );

  return result;
}

module.exports = {
  url,
  createToken,
  authorize,
  listLabels,
  listMessages,
  getMessages
}