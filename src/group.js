const { SPOND_API_URL } = require('./utils');

/**
 * @typedef {Object} Group - Represents a group.
 * @property {string} id
 * @property {string} name
 * @property {string} welcomeMessage
 * @property {string} activity
 * @property {string} imageUrl
 * @property {Date} createdTime
 * @property {Array<any>} members
 * @property {Array<any>} membershipRequests
 * @property {Array<SubGroup>} subGroups
 * @property {boolean} shareContactInfo
 * @property {boolean} adminsCanAddMembers
 * @property {boolean} contactInfoHidden
 * @property {Array<string>} memberPermissions
 * @property {Array<string>} guardianPermissions
 * @property {string} eventVisibility
 * @property {number} chatAgeLimit
 * @property {number} type
 * @property {string} signupUrl
 * @property {string} allowSmsNag
 * @property {Array<any>} roles
 * @property {boolean} allowPrivatePayoutAccounts
 *
 * @typedef {Object} SubGroup - Represents a group.
 * @property {string} id
 * @property {string} name
 * @property {string} color
 * @property {string} imageUrl
 */

/**
 * Fetches groups from the API and caches them.
 *
 * This function fetches groups from the API using the provided access token,
 * and returns an array of group objects.
 *
 * @param {string} accessToken - The user's access token.
 * @returns {Promise<Array<Group>>} An array of group objects.
 * @throws {Error} Throws an error if the API request fails.
 *
 */
async function getGroups(accessToken) {
  try {
    const response = await fetch(SPOND_API_URL + 'groups/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }

    const groups = await response.json();

    return groups;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {string} accessToken
 * @param {string} groupId
 * @returns {Promise<Group>} A group object.
 * @throws {Error} Throws an error if the API request fails.
 */
async function getGroup(accessToken, groupId) {
  try {
    const groups = await getGroups(accessToken);
    const groupOrUndefiend = groups.find((group) => group.id === groupId);
    return groupOrUndefiend;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGroups,
  getGroup,
};
