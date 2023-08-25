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
    expect(events.length).toBe(2);
  });

  test('Event has basic info', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
      includeHidden: true,
    });

    const eventOne = events.find((event) => event.id == 'BD957E98DF6F48EFAACEFCA3364847F7');
    
    // Basic info
    expect(eventOne.createdTime).toBe('2023-08-19T20:19:54.236Z');
    expect(eventOne.recipients.group.name).toBe('My Spond group 1');
    expect(eventOne.heading).toBe('Test event 1');
    expect(eventOne.description).toBe('This is a cool test event!');

    // Time
    expect(eventOne.startTimestamp).toBe('2023-08-19T21:00:00Z');
    expect(eventOne.endTimestamp).toBe('2023-08-19T22:00:00Z');
    expect(eventOne.meetupTimestamp).toBe('2023-08-19T20:50:00Z');

    // Location
    expect(eventOne.location.address).toBe('Trondheim');
    expect(eventOne.location.latitude).toBe(63.430515);
    expect(eventOne.location.longitude).toBe(10.395053);
    expect(eventOne.location.country).toBe('NO');
    expect(eventOne.location.administrativeAreaLevel1).toBe('Trøndelag');
    expect(eventOne.location.locality).toBe('Trondheim');

    // Responses
    expect(eventOne.responses.acceptedIds).not.toBeUndefined();
    expect(eventOne.responses.declinedIds).not.toBeUndefined();
    expect(eventOne.responses.unansweredIds).not.toBeUndefined();
    expect(eventOne.responses.waitinglistIds).not.toBeUndefined();

    // Group
    expect(eventOne.recipients.group.subGroups.length).toBe(2);
    expect(
      eventOne.recipients.group.subGroups.find(
        (subgroup) => subgroup.name === 'Alfa'
      ).color
    ).toBe('#0084ff');
    expect(
      eventOne.recipients.group.subGroups.find(
        (subgroup) => subgroup.name === 'Beta'
      ).color
    ).toBe('#ff5ca1');
    expect(
      eventOne.recipients.group.members.filter(
        (member) => member.firstName === 'Martin'
      ).length
    ).toBe(1);

    // Tasks
    expect(eventOne.tasks.openTasks.length).toBe(1);
    expect(eventOne.tasks.openTasks[0].name).toBe('This is a task');
    expect(eventOne.tasks.openTasks[0].description).toBe(
      'This is a description of the task'
    );

    // Other
    expect(eventOne.creatorId).not.toBeUndefined();
    expect(eventOne.autoAccept).not.toBeUndefined();
    expect(eventOne.expired).toBe(true);
    expect(eventOne.autoReminderType).toBe('DISABLED');
    expect(eventOne.participantsHidden).toBe(false);
    expect(eventOne.registered).toBe(false);
    expect(eventOne.commentsDisabled).toBe(false);
    expect(eventOne.type).toBe('EVENT');

    // test for eventTwo spesific stuff
    const eventTwo = events.find((event) => event.id == 'D8D4214F34904689ADD55D21BC5F1D45');


    expect(eventTwo.heading).toBe('Another event');
    expect(eventTwo.attachments[0].id).toBe('A113B29161C140CBA3282558F4619C3F');
    expect(eventTwo.attachments[0].media).toBe('https://spond.com/storage/upload/CC447739024B1E7CF44F2676F4B5B903/1692551339_289352DC/dachshund.jpeg');
    expect(eventTwo.attachments[0].type).toBe(1);
    expect(eventTwo.attachments[0].timestamp).toBe('2023-08-20T17:09:27.850Z');
  });

  test('Event search minEndTimestamp', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
      includeHidden: true,
      minEndTimestamp: new Date('2024-08-19T22:00:00Z').toISOString(),
    });
    expect(events.length).toBe(1);
    expect(events[0].heading).toBe('Another event');
  })

  test('Event search maxEndTimestamp', async () => {
    const groups = await getGroups(accessTokenCached);
    const events = await getEvents(accessTokenCached, {
      groupId: groups.find((group) => group.name == 'My Spond group 1').id,
      includeHidden: true,
      maxEndTimestamp: new Date().toISOString(),
    });
    expect(events.length).toBe(1);
    expect(events[0].heading).toBe('Test event 1');
  })
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
