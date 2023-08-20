const { isDate, SPOND_API_URL } = require('./utils');

/**
 * @typedef {import("./group").Group} Group
 * @typedef {import("./group").SubGroup} SubGroup
 */

/**
 * @typedef {Object} Event - Represents an event.
 * @property {string} id
 * @property {string} heading
 * @property {string} creatorId
 * @property {string} description
 * @property {Array<any>} owners
 * @property {Date} startTimestamp
 * @property {Date} endTimestamp
 * @property {string} location
 * @property {{group: Group profiles: Array<any>, guardians: Array<any>}} recipients
 * @property {{acceptedIds: Array<string>, declinedIds: Array<string>, unanswerdIds: Array<string>, waitinglistIds: Array<string>}} responses
 * @property {{openTasks: Array<any>, assignedTasks: Array<any>}} tasks
 * @property {Array<any>} comments
 * @property {Array<any>} attachments
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

 *
 */
async function getEvents(
  accessToken,
  { maxEvents = 50, includeScheduled = false, ...options }
) {
  const params = new URLSearchParams();
  params.append('groupId', options.groupId);
  params.append('includeScheduled', options.includeScheduled);
  params.append('maxEvents', options.maxEvents);

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
