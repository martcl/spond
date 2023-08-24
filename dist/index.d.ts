import events = require('./event');
import group = require('./group');
import login = require('./login');
import posts = require('./post');

export declare let createUserAccessToken: typeof login.createUserAccessToken;

export declare let getEvents: typeof events.getEvents;

export declare let getGroup: typeof group.getGroup;

export declare let getGroups: typeof group.getGroups;

export declare let getPosts: typeof posts.getPosts;

export declare let SPOND_API_URL: string;

export { }
