/**
 * Tasks.js
 * @author Nicolas Pitcher
 * A table holding user tasks.
 */

module.exports = {
  attributes: {
    userID: {
      model: 'users',
      required: true,
    },
    taskName: {
      type: 'string',
      required: true,
    },
    userPlantID: {
      model: 'userplants',
      required: true,
    },
    taskType: {
      type: 'string',
      required: true,
    },
    taskCompleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  }
};
