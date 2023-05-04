// api/helpers/schedule-plant-tasks.js
/**
 * schedule-plant-tasks.js
 *
 * A helper to schedule plant tasks based on user plant needs.
 * @example await sails.helpers.schedulePlantTasks();
 * @see https://sailsjs.com/documentation/concepts/helpers
  */

module.exports = {
  friendlyName: 'Schedule plant tasks',
  description: 'Create the user plant tasks for the day.',
  fn: async function(inputs, exits) {
    const moment = require('moment'); // Require moment
    let userPlants = await UserPlants.find().populate('plantID'); // Find all user plants
    const tasksToCreate = []; // Create an array to hold the tasks to create
    const currentTasks = await Tasks.find({
      where: {
        createdAt: {
          '>=': moment().startOf('day').valueOf(),
        }
      }
    }); // Find all current tasks
    //Filter out the current tasks from the user plants
    userPlants = userPlants.filter((userPlant) => {
      return !currentTasks.some((task) => {
        return task.userPlantID === userPlant.id;
      });
    });
    for (const userPlant of userPlants) { // Loop through each user plant
      const lastWatered = moment(userPlant.lastWatered); // Get the last watered date
      const lastFertilized = moment(userPlant.lastFertilized); // Get the last fertilized date
      const waterFrequency = userPlant.waterFrequency; // Get the water frequency
      const fertilizerFrequency = userPlant.fertilizerFrequency; // Get the fertilizer frequency
      const quantity = userPlant.quantity; // Get the quantity
      const userID = userPlant.userID; // Get the user ID
      const plantID = userPlant.plantID; // Get the plant ID
      const now = moment(); // Get the current date
      const waterDiff = now.diff(lastWatered, 'days'); // Get the difference between the last watered date and now
      const fertilizerDiff = now.diff(lastFertilized, 'days'); // Get the difference between the last fertilized date and now
      if (waterDiff >= waterFrequency) { // If the water difference is greater than or equal to the water frequency
        tasksToCreate.push({ // Push a new task to the array
          userID,
          taskName: `Water your ${quantity} ${plantID.name}`,
          userPlantID: userPlant.id,
          taskType: 'water'
        });
      }
      if (fertilizerDiff >= fertilizerFrequency) { // If the fertilizer difference is greater than or equal to the fertilizer frequency
        tasksToCreate.push({ // Push a new task to the array
          userID,
          taskName: `Fertilize your ${quantity} ${plantID.name}`,
          userPlantID: userPlant.id,
          taskType: 'fertilize'
        });
      }
    }
    await Tasks.createEach(tasksToCreate); // Create the tasks
    //Delete tasks that are older than the number of days specified in config/custom.js
    const taskExpirationDays = sails.config.custom.taskExpirationDays; // Get the number of days to keep tasks
    const expirationDate = moment().subtract(taskExpirationDays, 'days').valueOf(); // Get the expiration date
    await Tasks.destroy({createdAt: {'<': expirationDate}}); // Delete the tasks
    return exits.success(); // Return
  }
};
