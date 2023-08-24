/**
 * - Represents a group.
 */
export type Group = {
    id: string;
    name: string;
    welcomeMessage: string;
    activity: string;
    imageUrl: string;
    createdTime: Date;
    members: Array<any>;
    membershipRequests: Array<any>;
    subGroups: Array<SubGroup>;
    shareContactInfo: boolean;
    adminsCanAddMembers: boolean;
    contactInfoHidden: boolean;
    memberPermissions: Array<string>;
    guardianPermissions: Array<string>;
    eventVisibility: string;
    chatAgeLimit: number;
    type: number;
    signupUrl: string;
    allowSmsNag: string;
    roles: Array<any>;
    allowPrivatePayoutAccounts: boolean;
};
/**
 * - Represents a group.
 */
export type SubGroup = {
    id: string;
    name: string;
    color: string;
    imageUrl: string;
};
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
export function getGroups(accessToken: string): Promise<Array<Group>>;
/**
 *
 * @param {string} accessToken
 * @param {string} groupId
 * @returns {Promise<Group>} A group object.
 * @throws {Error} Throws an error if the API request fails.
 */
export function getGroup(accessToken: string, groupId: string): Promise<Group>;
//# sourceMappingURL=group.d.ts.map