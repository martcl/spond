import events = require("./event");
import group = require("./group");
import posts = require("./post");
import login = require("./login");
export let getEvents: typeof events.getEvents;
export let getGroups: typeof group.getGroups;
export let getGroup: typeof group.getGroup;
export let getPosts: typeof posts.getPosts;
export let createUserAccessToken: typeof login.createUserAccessToken;
export let SPOND_API_URL: string;
//# sourceMappingURL=index.d.ts.map