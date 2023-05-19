/**
 * @author Nicolas Pitcher
 * Forum.js
 *
 * A table holding user blog posts.
 */

module.exports = {
  attributes: {
    body: { // Body of the post
      type: 'string',
      required: true,
    },
    userID: {
      model: 'users',
      required: true,
    },
    reply: {
      collection: 'reply',
      via: 'forumID',
    }
  }
};
