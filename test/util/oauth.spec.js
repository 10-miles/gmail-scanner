const gmail = require('../../src/util/gmail');

describe('Google OAuth 사용을 위한', () => {
  it('Message List 호출', async () => {
    gmail.listMessages()
    .then((result) => console.log(result));
  });
});