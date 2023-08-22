const { isDate, SPOND_API_URL } = require('./utils');

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
async function getEvents(
  accessToken,
  options
) {
  const { maxEvents = 50, includeScheduled = false } = options;

  const params = new URLSearchParams();

  if (!options.groupId) {
    throw new Error('groupId is required');
  }
  params.append('groupId', options.groupId);
  params.append('includeScheduled', includeScheduled);
  params.append('maxEvents', maxEvents);

  if (isDate(options.maxEnd)) {
    params.append('maxEnd', options.maxEnd.toISOString());
  }

  if (isDate(options.minEnd)) {
    params.append('minEnd', options.minEnd.toISOString());
  }

  if (isDate(options.maxStart)) {
    params.append('maxStart', options.maxStart.toISOString());
  }

  if (isDate(options.minStart)) {
    params.append('minStart', options.minStart.toISOString());
  }

  try {
    const response = await fetch(
      SPOND_API_URL + 'sponds/?' + params.toString(),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events = await response.json();

    return events;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getEvents,
};
