require('dotenv').config();

const {
  createUserAccessToken,
  getGroups,
  getEvents,
  SPOND_API_URL,
} = require('../src/index');

const username = process.env.SPOND_USERNAME;
const password = process.env.SPOND_PASSWORD;

// Cache the access token for the duration of the tests
// to not spam the API with requests
var accessTokenCached;

describe('Check health of Spond API', () => {
  test('SPOND_API_URL is ok', async () => {
    const response = await fetch(SPOND_API_URL + 'login');
    expect(response.status).toBe(405);
  });
});

describe('Spond authentication', () => {
  test('Creating a new access token', async () => {
    expect(username).not.toBeUndefined();
    expect(password).not.toBeUndefined();

    const accessToken = await createUserAccessToken(username, password);
    expect(accessToken).not.toBeUndefined();

    accessTokenCached = accessToken;
  });
});

describe('Spond groups', () => {
  test('Getting groups', async () => {
    const groups = await getGroups(accessTokenCached);
    expect(groups).not.toBeUndefined();
  });
});

describe('Spond events', () => {
  test('Getting events', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
    });
    expect(events).not.toBeUndefined();
  });

  test('Event has basic info', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
    });

    expect(events).not.toBeUndefined();
    expect(events[0].heading).not.toBeUndefined();
    expect(events[0].description).not.toBeUndefined();
    expect(events[0].creatorId).not.toBeUndefined();
    expect(events[0].autoAccept).not.toBeUndefined();
  });
});
