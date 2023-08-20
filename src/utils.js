const SPOND_API_URL = process.env.SPOND_API_URL || 'https://spond.com/api/2.1/';

/** 
 * @param {any} date 
 * @returns 
 */
function isDate(date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

/**
 * @param {Date} date
 * @returns {string} ISO 8601 date string
 */
function formatDate(date) {
  return date.toISOString().slice(0, 10) + 'T00:00:00.000Z';
}

module.exports = {
    isDate,
    formatDate,
    SPOND_API_URL,
};
