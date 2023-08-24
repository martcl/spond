/**
 * - Represents an event.
 */
export type Event = {
  id: string;
  heading: string;
  creatorId: string;
  description: string;
  picture?: string | undefined;
  owners: Array<EventOwner>;
  startTimestamp: Date;
  endTimestamp: Date;
  meetupTimestamp?: Date | undefined;
  location?: Location | undefined;
  recipients: {
    group: EventGroup;
    profiles: Array<any>;
    guardians: Array<any>;
  };
  responses: EventResponses;
  tasks: {
    openTasks: Array<OpenTasks>;
    assignedTasks: Array<any>;
  };
  comments: Array<any>;
  attachments: Array<Attachment>;
  createdTime: Date;
  expired: boolean;
  visibility: string;
  autoAccept: boolean;
  hidden: boolean;
  autoReminderType: string;
  participantsHidden: boolean;
  registered: boolean;
  commentsDisabled: boolean;
  type: string;
  /**
   * TODO: Find out what this time is
   */
  updated: string;
  /**
   * TODO: Find out what this is
   */
  matchEvent: boolean;
};
/**
 * - Represents a event owner.
 */
export type EventOwner = {
  id: string;
  response: string;
};
/**
 * - Represents a sub group.
 */
export type SubGroup = {
  id: string;
  name: string;
  color: string;
};
/**
 * - Represents a event recipient.
 */
export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  respondent: string;
  guardians: Array<any>;
};
/**
 * - Represents a event group.
 */
export type EventGroup = {
  id: string;
  contactPersonId: string;
  name: string;
  subGroups: Array<SubGroup>;
  createdTime: number;
  members: Array<Member>;
  type: number;
  activity: string;
};
/**
 * - Represents event responses.
 */
export type EventResponses = {
  acceptedIds: Array<string>;
  declinedIds: Array<string>;
  unansweredIds: Array<string>;
  waitinglistIds: Array<string>;
  unconfirmedIds: Array<string>;
};
/**
 * - Represents open tasks.
 */
export type OpenTasks = {
  id: string;
  name: string;
  description: string;
  adultsOnly: boolean;
  type: string;
  /**
   * - The maximum number of participants.
   */
  limit: number;
  /**
   * - The number of remaining participant that is needed to complete the task.
   */
  remaining: number;
  accepted: Array<string>;
  declined: Array<string>;
  unanswered: Array<string>;
};
/**
 * - Represents an attachment.
 */
export type Attachment = {
  id: string;
  media: string;
  type: number;
  title: string;
  ownerId: string;
  timestamp: Date;
};
/**
 * - Represents a location.
 */
export type Location = {
  id: string;
  feature: string;
  address: string;
  latitude: number;
  longitude: number;
  country: string;
  administrativeAreaLevel1: string;
  locality: string;
};
/**
 * @typedef {Object} Event - Represents an event.
 * @property {string} id
 * @property {string} heading
 * @property {string} creatorId
 * @property {string} description
 * @property {string} [picture]
 *
 * @property {Array<EventOwner>} owners
 *
 * @property {Date} startTimestamp
 * @property {Date} endTimestamp
 * @property {Date} [meetupTimestamp]
 *
 * @property {Location} [location]
 * @property {{group: EventGroup, profiles: Array<any>, guardians: Array<any>}} recipients
 * @property {EventResponses} responses
 * @property {{openTasks: Array<OpenTasks>, assignedTasks: Array<any>}} tasks
 * @property {Array<any>} comments
 * @property {Array<Attachment>} attachments
 * @property {Date} createdTime
 * @property {boolean} expired
 * @property {string} visibility
 * @property {boolean} autoAccept
 * @property {boolean} hidden
 * @property {string} autoReminderType
 * @property {boolean} participantsHidden
 * @property {boolean} registered
 * @property {boolean} commentsDisabled
 * @property {string} type
 * @property {string} updated TODO: Find out what this time is
 * @property {boolean} matchEvent TODO: Find out what this is
 *
 * @typedef {Object} EventOwner - Represents a event owner.
 * @property {string} id
 * @property {string} response
 *
 * @typedef {Object} SubGroup - Represents a sub group.
 * @property {string} id
 * @property {string} name
 * @property {string} color
 *
 * @typedef {Object} Member - Represents a event recipient.
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} respondent
 * @property {Array<any>} guardians
 *
 * @typedef {Object} EventGroup - Represents a event group.
 * @property {string} id
 * @property {string} contactPersonId
 * @property {string} name
 * @property {Array<SubGroup>} subGroups
 * @property {number} createdTime
 * @property {Array<Member>} members
 * @property {number} type
 * @property {string} activity
 *
 * @typedef {Object} EventResponses - Represents event responses.
 * @property {Array<string>} acceptedIds
 * @property {Array<string>} declinedIds
 * @property {Array<string>} unansweredIds
 * @property {Array<string>} waitinglistIds
 * @property {Array<string>} unconfirmedIds
 *
 * @typedef {Object} OpenTasks - Represents open tasks.
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {boolean} adultsOnly
 * @property {string} type
 * @property {number} limit - The maximum number of participants.
 * @property {number} remaining - The number of remaining participant that is needed to complete the task.
 * @property {Array<string>} accepted
 * @property {Array<string>} declined
 * @property {Array<string>} unanswered
 *
 * @typedef {Object} Attachment - Represents an attachment.
 * @property {string} id
 * @property {string} media
 * @property {number} type
 * @property {string} title
 * @property {string} ownerId
 * @property {Date} timestamp
 *
 * @typedef {Object} Location - Represents a location.
 * @property {string} id
 * @property {string} feature
 * @property {string} address
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} country
 * @property {string} administrativeAreaLevel1
 * @property {string} locality
 *
 */
/**
 * Fetches events from the API.
 *
 * @param {string} accessToken - User access token.
 * @param {Object} options - Configuration options for fetching events.
 * @param {string} options.groupId - The ID of the group to fetch events from.
 * @param {boolean} options.includeScheduled - Whether to include scheduled events.
 * @param {Date} options.maxEnd - The maximum end date for events (optional).
 * @param {Date} options.minEnd - The minimum end date for events (optional).
 * @param {Date} options.maxStart - The maximum start date for events (optional).
 * @param {Date} options.minStart - The minimum start date for events (optional).
 * @param {number} options.maxEvents - The maximum number of events to fetch (default is 50).
 * @throws {Error} Throws an error if any of the date options is not a valid Date object.
 * @returns {Promise<Array<Event>>} An array of event objects.
 */
export function getEvents(
  accessToken: string,
  groupId: string,
  options: {
    includeScheduled: boolean;
    maxEnd: Date;
    minEnd: Date;
    maxStart: Date;
    minStart: Date;
    maxEvents: number;
  }
): Promise<Array<Event>>;
//# sourceMappingURL=event.d.ts.map
