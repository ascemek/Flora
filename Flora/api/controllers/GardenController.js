/**
 * @author Nicolas Pitcher
 * @version 1.0
 * @date 05/10/23
 * @title Garden Controller
 * @description This controller handles all the requests for the garden page.
 * @usage This controller is used to controll the my garden page.
 * @frameworks sails.js
 */

const moment = require('moment');

module.exports = {
  viewGarden: async function(req, res) {
    try {
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      const userTasks = await Tasks.find({
        where: {userID: req.session.userId, createdAt: {'>=': moment().startOf('day').valueOf()}},
        select: ['id', 'taskName', 'taskCompleted', 'userPlantID']
      }).populate('userPlantID');
      const myPlants = await UserPlants.find({userID: req.session.userId}).populate('plantID');
      return res.view('pages/my_garden', {
        tasks: JSON.stringify(userTasks),
        plants: JSON.stringify(myPlants)
      }
      );
    } catch (error) {
      console.log(error);
      return res.send({ // Return error
        error: 'Error fetching plants'
      });
    }
  },
  updateTask: async function(req, res) {
    try {
      const taskID = req.param('taskId'); // Get the task ID
      let taskCompleted = req.param('taskCompleted'); // Get the task completed
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      if (!taskID) { // Check if task ID is valid
        return res.send({
          error: 'Invalid task ID'
        });
      }
      if (taskCompleted === undefined) { // Check if task completed is valid
        return res.send({
          error: 'Invalid task completed'
        });
      } else {
        taskCompleted = taskCompleted === 'true'; // Convert to boolean
      }
      const task = await Tasks.update({id: taskID}, {taskCompleted}).fetch(); // Update the task and fetch the record
      if (task.length === 0) { // Check if task was updated
        return res.send({
          error: 'Error updating task'
        });
      }
      if (task[0].taskCompleted) { // Check if task was completed
        if (task[0].taskType === 'water') { // Check if task was a water task
          await UserPlants.update({id: task[0].userPlantID}, {lastWatered: moment().format()}); // Update the last watered date
        }
        if (task[0].taskType === 'fertilize') { // Check if task was a fertilize task
          await UserPlants.update({id: task[0].userPlantID}, {lastFertilized: moment().format()}); // Update the last fertilized date
        }
      }
      return res.send({ // Return success
        success: true
      });
    } catch (error) {
      console.log(error);
      return res.send({ // Return error
        error: 'Error updating task'
      });
    }
  },
  removePlant: async function(req, res) {
    try {
      const plantID = req.param('plantId'); // Get the plant ID
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      if (!plantID) { // Check if plant ID is valid
        return res.send({
          error: 'Invalid plant ID'
        });
      }
      const plant = await UserPlants.destroy({id: plantID, userID: req.session.userId}).fetch(); // Delete the plant and fetch the record
      if (plant.length === 0) { // Check if plant was deleted
        return res.send({
          error: 'Error removing plant'
        });
      }
      return res.send({ // Return success
        success: true
      });
    } catch (error) {
      console.log(error);
      return res.send({ // Return error
        error: 'Error removing plant'
      });
    }
  },
  favoritePlant: async function(req, res) {
    try {
      const plantID = req.param('plantId'); // Get the plant ID
      let isFavorite = req.param('isFavorite'); // Get the is favorite
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      if (!plantID) { // Check if plant ID is valid
        return res.send({
          error: 'Invalid plant ID'
        });
      }
      if (isFavorite === undefined) { // Check if is favorite is valid
        return res.send({
          error: 'Invalid is favorite value'
        });
      } else {
        isFavorite = isFavorite === 'true'; // Convert to boolean
      }
      const plant = await UserPlants.update({id: plantID, userID: req.session.userId}, {isFavorite}).fetch(); // Update the plant and fetch the record
      if (plant.length === 0) { // Check if plant was updated
        return res.send({
          error: 'Error favoriting plant'
        });
      }
      return res.send({ // Return success
        success: true
      });
    } catch (error) {
      console.log(error);
      return res.send({ // Return error
        error: 'Error favoriting plant'
      });
    }
  },
  viewFutureTask: async function(req, res) {
    try {
      const date = req.param('date'); // Get the date
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      if (!date) { // Check if date is valid
        return res.send({
          error: 'Invalid date'
        });
      }
      const dateObject = moment(date, 'YYYY-MM-DD'); // Create a moment object from the date
      let userTasks = await Tasks.find({
        where: {userID: req.session.userId, createdAt: {'>=': dateObject.startOf('day').valueOf(), '<=': dateObject.endOf('day').valueOf()}},
        select: ['id', 'taskName', 'taskCompleted', 'userPlantID']
      }).populate('userPlantID');
      if (userTasks.length === 0 && dateObject.isAfter(moment())) {
        userTasks = [];
        let userPlants = await UserPlants.find({
          where: {userID: req.session.userId},
        }).populate('plantID'); // Find all user plants
        let counter = 1;
        for (const userPlant of userPlants) { // Loop through each user plant
          const lastWatered = moment(userPlant.lastWatered); // Get the last watered date
          const lastFertilized = moment(userPlant.lastFertilized); // Get the last fertilized date
          const waterFrequency = userPlant.waterFrequency; // Get the water frequency
          const fertilizerFrequency = userPlant.fertilizerFrequency; // Get the fertilizer frequency
          const quantity = userPlant.quantity; // Get the quantity
          const userID = userPlant.userID; // Get the user ID
          const plantID = userPlant.plantID; // Get the plant ID
          const waterDiff = dateObject.diff(lastWatered, 'days'); // Get the difference between the last watered date and now
          const fertilizerDiff = dateObject.diff(lastFertilized, 'days'); // Get the difference between the last fertilized date and now
          if (waterDiff >= waterFrequency) { // If the water difference is greater than or equal to the water frequency
            userTasks.push({ // Push a new task to the array
              id: counter,
              userID,
              taskName: `Water your ${quantity} ${plantID.name}`,
              userPlantID: userPlant.id,
              taskType: 'water',
              isFutureTask: true
            });
            counter++;
          }
          if (fertilizerDiff >= fertilizerFrequency) { // If the fertilizer difference is greater than or equal to the fertilizer frequency
            userTasks.push({ // Push a new task to the array
              id: counter,
              userID,
              taskName: `Fertilize your ${quantity} ${plantID.name}`,
              userPlantID: userPlant.id,
              taskType: 'fertilize',
              isFutureTask: true
            });
            counter++;
          }
        }
      }
      return res.send({ // Return success
        success: true,
        tasks: userTasks
      });
    } catch (error) {
    }
  }
};
