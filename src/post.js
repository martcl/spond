const { SPOND_API_URL } = require('./utils');

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
