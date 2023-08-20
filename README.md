# Spond API package for JavaScript

This is a unofficial JavaScript package built to consume data from the Spond API. The package is ment to be used in a Node.js environment and should not be used in a browser.

This codebase is a work in progress and is not yet ready for production use.

## Installation

```bash
npm install spond
```

## How to use

### Function: `createUserAccessToken`

**Description:** This function creates a user access token by sending a POST request to the spond API login endpoint using the provided username and password.

**Usage Example:**

```javascript
const { createUserAccessToken } = require('spond');

try {
  const accessToken = await createUserAccessToken(
    'user@example.com',
    'password123'
  );
  console.log('Access token:', accessToken);
} catch (error) {
  console.error('Authentication failed:', error.message);
}
```

### Function: `getGroups`

**Description**: This function fetches groups from the API using the provided access token and returns an array of group objects.

**Usage Example:**

```javascript
const { getGroups } = require('spond');

try {
  const groups = await getGroups(accessToken);
  console.log('Groups:', groups);
} catch (error) {
  console.error('Failed to get groups:', error.message);
}
```

### Function: `getEvents`

**Description**: This function fetches events from the API using the provided access token and returns an array of event objects.

**Usage Example:**

```javascript
const { getEvents } = require('spond');

try {
  const events = await getEvents(accessToken, {groupId: '123456789'});
  console.log('Events:', events);
} catch (error) {
  console.error('Failed to get events:', error.message);
}
```

## Local development

To run the code locally you need to have Node.js installed. Then you can run the following commands in the root of the project:

```bash
git clone https://github.com/martcl/spond.git
cd spond
nvm use
npm install

cp .env.example .env # and fill in the values
npm run test
```

## Tests

The goal is to have comprehensive tests for all endpoints. The tests are written using [Jest](https://jestjs.io/).

### Dayly tests

I don't have control over how the Spond API changes and I want to be notified if something breaks. Therefore I have set up a GitHub Action that runs the tests every day. If the tests fail I will get a notification.

### Running the tests locally

To run the tests locally you need to have Node.js installed. Then you can run the following commands in the root of the project:

```bash
npm run test
```

## Project goal

The goal of this project is to make it easier to consume data from the Spond API. The Spond API is not documented and is not ment to be used by third parties. But there are many use cases where it would be nice to have access to the data. Like integrating the Spond events and posts into a website so people outside of Spond can see the information.

## Contributing

If you want to contribute to this project you are more than welcome to do so.
