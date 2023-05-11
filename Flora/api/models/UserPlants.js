/**
 * UserPlants.js
 *
 * A table holding user plants.
 */

module.exports = {
  attributes: {
    userID: {
      model: 'users',
      required: true,
    },
    plantID: {
      model: 'plant',
      required: true,
    },
    waterFrequency: {
      type: 'number',
      required: true,
    },
    fertilizerFrequency: {
      type: 'number',
      required: true,
    },
    lastWatered: {
      type: 'string',
      required: true,
    },
    lastFertilized: {
      type: 'string',
      required: true,
    },
    quantity: {
      type: 'number',
      required: true,
    },
    isFavorite: {
      type: 'boolean',
      defaultsTo: false,
    }
  }
};
