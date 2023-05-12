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
          await UserPlants.update({id: task[0].userPlantID}, {lastWatered: moment().valueOf()}); // Update the last watered date
        }
        if (task[0].taskType === 'fertilize') { // Check if task was a fertilize task
          await UserPlants.update({id: task[0].userPlantID}, {lastFertilized: moment().valueOf()}); // Update the last fertilized date
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
  }
};
