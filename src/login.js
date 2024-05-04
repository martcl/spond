const { SPOND_API_URL } = require('./utils');


async function createUserAccessToken(username, password) {
  const response = await fetch(SPOND_API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token. Wrong email or password.');
  }

  /** @type {{loginToken: string}} */
  const loginJson = await response.json();

  return loginJson.loginToken;
}

module.exports = {
  createUserAccessToken,
};
