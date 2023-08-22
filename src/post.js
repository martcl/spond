const { SPOND_API_URL } = require('./utils');

/**
 * @typedef {Object} post
 * @property {string} id
 * @property {string} type
 * @property {string} groupId
 * @property {string[]} subGroupIds
 * @property {string} title
 * @property {string} body
 * @property {string} ownerId
 * @property {string} timestamp
 * @property {Array[any]} media
 * @property {import('./event').Attachment} attachments
 * @property {string} visibility
 * @property {boolean} unread
 * @property {boolean} commentsDisabled
 * @property {number} seenCount
 * @property {boolean} muted
 */

/**
 * @typedef {Object} options
 * @property {string} type - Type of posts to fetch. Possible values: 'PLAIN'
 * @property {boolean} includeComments - Include comments in the response
 * @property {boolean} includeReadStatus - Include read status in the response
 * @property {boolean} includeSeenCount - Include seen count in the response
 * @property {number} maxPosts - Maximum number of posts to fetch
 *
 * @param {string} accessToken
 * @param {options} options
 * @returns {post[]} a list of posts
 */
async function getPosts(accessToken, options) {
  const {
    type = 'PLAIN',
    includeComments = true,
    includeReadStatus = true,
    includeSeenCount = true,
    maxPosts = 5,
  } = options;

  const params = new URLSearchParams();
  params.append('type', type);
  params.append('includeComments', includeComments);
  params.append('includeReadStatus', includeReadStatus);
  params.append('includeSeenCount', includeSeenCount);
  params.append('max', maxPosts);

  try {
    const response = await fetch(
      SPOND_API_URL + 'posts?' + params.toString(),
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

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPosts,
};
