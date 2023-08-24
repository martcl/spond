export type post = {
    id: string;
    type: string;
    groupId: string;
    subGroupIds: string[];
    title: string;
    body: string;
    ownerId: string;
    timestamp: string;
    media: any[][any];
    attachments: import('./event').Attachment;
    visibility: string;
    unread: boolean;
    commentsDisabled: boolean;
    seenCount: number;
    muted: boolean;
};
export type options = {
    /**
     * - Type of posts to fetch. Possible values: 'PLAIN'
     */
    type: string;
    /**
     * - Include comments in the response
     */
    includeComments: boolean;
    /**
     * - Include read status in the response
     */
    includeReadStatus: boolean;
    /**
     * - Include seen count in the response
     */
    includeSeenCount: boolean;
    /**
     * - Maximum number of posts to fetch
     */
    maxPosts: number;
};
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
export function getPosts(accessToken: string, options: options): post[];
//# sourceMappingURL=post.d.ts.map