

const { isDate, SPOND_API_URL, formatDate } = require('./utils');


async function getEvents(
  accessToken,
  options
) {
  const { maxEvents = 50, scheduled = true, includeComments = false, order = "asc" } = options;

  const params = new URLSearchParams();

  params.append('scheduled', scheduled);
  params.append('max', maxEvents);
  params.append('includeComments', includeComments);
  params.append('order', order);


  if (options.includeHidden) {
    params.append('includeHidden', options.includeHidden);
  }

  if (options.groupId) {
    params.append('groupId', options.groupId);
  }

  if (options.maxEndTimestamp) {
    params.append('maxEndTimestamp', options.maxEndTimestamp);
  }

  if (options.minEndTimestamp) {
    params.append('minEndTimestamp', options.minEndTimestamp);
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
