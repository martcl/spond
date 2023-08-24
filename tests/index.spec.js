require('dotenv').config();

const {
  createUserAccessToken,
  getGroups,
  getEvents,
  SPOND_API_URL,
  getPosts,
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
      includeHidden: true,
    });
    expect(events).not.toBeUndefined();
  });

  test('Event has basic info', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
      includeHidden: true,
    });

    const event = events.find((event) => event.heading == 'Test event 1');

    expect(event).not.toBeUndefined();

    // Basic info
    expect(event.createdTime).toBe('2023-08-19T20:19:54.236Z');
    expect(event.recipients.group.name).toBe('My Spond group 1');
    expect(event.heading).toBe('Test event 1');
    expect(event.description).toBe('This is a cool test event!');

    // Time
    expect(event.startTimestamp).toBe('2023-08-19T21:00:00Z');
    expect(event.endTimestamp).toBe('2023-08-19T22:00:00Z');
    expect(event.meetupTimestamp).toBe('2023-08-19T20:50:00Z');

    // Location
    expect(event.location.address).toBe('Trondheim');
    expect(event.location.latitude).toBe(63.430515);
    expect(event.location.longitude).toBe(10.395053);
    expect(event.location.country).toBe('NO');
    expect(event.location.administrativeAreaLevel1).toBe('Trøndelag');
    expect(event.location.locality).toBe('Trondheim');

    // Responses
    expect(event.responses.acceptedIds).not.toBeUndefined();
    expect(event.responses.declinedIds).not.toBeUndefined();
    expect(event.responses.unansweredIds).not.toBeUndefined();
    expect(event.responses.waitinglistIds).not.toBeUndefined();

    // Group
    expect(event.recipients.group.subGroups.length).toBe(2);
    expect(
      event.recipients.group.subGroups.find(
        (subgroup) => subgroup.name === 'Alfa'
      ).color
    ).toBe('#0084ff');
    expect(
      event.recipients.group.subGroups.find(
        (subgroup) => subgroup.name === 'Beta'
      ).color
    ).toBe('#ff5ca1');
    expect(
      event.recipients.group.members.filter(
        (member) => member.firstName === 'Martin'
      ).length
    ).toBe(1);

    // Tasks
    expect(event.tasks.openTasks.length).toBe(1);
    expect(event.tasks.openTasks[0].name).toBe('This is a task');
    expect(event.tasks.openTasks[0].description).toBe(
      'This is a description of the task'
    );

    // Other
    expect(event.creatorId).not.toBeUndefined();
    expect(event.autoAccept).not.toBeUndefined();
    expect(event.expired).toBe(true);
  });
});

describe('Spond posts', () => {
  test('Getting posts', async () => {
    const groups = await getGroups(accessTokenCached);
    const posts = await getPosts(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
    });
    expect(posts).not.toBeUndefined();
  });

  test('Post has basic info', async () => {
    const groups = await getGroups(accessTokenCached);
    const posts = await getPosts(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
    });

    const post = posts.find((post) => post.title == 'This is a post');

    expect(post).not.toBeUndefined();

    // Basic info
    expect(post.title).toBe('This is a post');
    expect(post.body).toBe('Hi! This is description in a post');
    expect(post.unread).not.toBeUndefined();
    expect(post.commentsDisabled).toBe(false);
    expect(post.muted).toBe(false);

    // Time
    expect(post.timestamp).toBe('2023-08-22T09:35:28.072Z');

    // Other
    expect(post.ownerId).not.toBeUndefined();
    expect(post.visibility).toBe('ALL');
    expect(post.seenCount).not.toBeUndefined();
  });
});
