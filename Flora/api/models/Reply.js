/**
 * Reply.js
 *
 * A table holding user blog post replies.
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
    forumID: {
      model: 'forum',
    }
  }
};
