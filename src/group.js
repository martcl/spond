const { SPOND_API_URL } = require('./utils');


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
