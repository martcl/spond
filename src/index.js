const events = require('./event');
const group = require('./group');
const login = require('./login');
const utils = require('./utils');
const posts = require('./post');

module.exports = {
  getEvents: events.getEvents,
  getGroups: group.getGroups,
  getGroup: group.getGroup,
  getPosts: posts.getPosts,
  createUserAccessToken: login.createUserAccessToken,
  SPOND_API_URL: utils.SPOND_API_URL,
};
