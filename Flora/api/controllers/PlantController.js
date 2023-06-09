/**
 * @author Sami Cemek
 * @version 1.0
 * @date 04/28/23
 * @title Plant Controller
 * @description This controller handles all the requests for the plant model.
 * @usage This controller is used to create, update, and delete plants.
 * @frameworks sails.js
 */

const moment = require('moment');

module.exports = {
  createPlant: async function(req, res) {
    try {
      const userId = req.session.userId;
      const body = req.param('body');
      if (!userId || !body) { // Check if user ID and body are provided
        return res.send({
          error: 'User ID and body required'
        });
      }
      if(body.length < 1) { // Check if body is too short
        return res.send({
          error: 'Body must be at least 1 character'
        });
      }
      if (body.length > 500) { // Check if body is too long
        return res.send({
          error: 'Body must be less than 500 characters'
        });
      }
      await Forum.create({
        userID: userId,
        body: body
      });
      return res.send({ // Return success
        success: true
      });
    } catch (error) {
      return res.send({ // Return error if user doesn't exist
        error: 'Error creating post'
      });
    }
  },
  fetchPlants: async function(req, res) {
    try {
      const plants = await Forum.find({}).populate('userID');
      return res.view('pages/forum', {
        postdata:JSON.stringify(plants)
      }
      );
    } catch (error) {
    }
  },
  viewPlantInfo: async function(req, res) {
    try {
      const plantID = req.param('plantID');
      if (!plantID) { // Check if plant ID is valid
        return res.send({
          error: 'Invalid plant ID'
        });
      }
      const plantInfo = await Plant.find({
        where: {id: plantID},
      });
      return res.view('pages/plantInfo', {
        plantInfo: JSON.stringify(plantInfo[0])
      }
      );
    } catch (error) {
    }
  },
  viewPlantAdd: async function(req, res) {
    try {
      const plantID = req.param('plantID');
      if (!plantID) { // Check if plant ID is valid
        return res.send({
          error: 'Invalid plant ID'
        });
      }
      const plantInfo = await Plant.find({
        where: {id: plantID},
      });
      return res.view('pages/new_plant', {
        plantInfo: JSON.stringify(plantInfo[0])
      }
      );
    } catch (error) {
    }
  },
  addPlant: async function(req, res) {
    try {
      const plantID = req.param('plantId');
      const waterFreq = req.param('water');
      const fertilizerFreq = req.param('fertilizer');
      const quantity = req.param('quantity');
      let favorite = req.param('favorite');
      if (!req.session.userId) { // Check if user is logged in
        return res.send({
          error: 'User not logged in'
        });
      }
      if (!plantID || !waterFreq || !fertilizerFreq || !quantity || !favorite) { // Check if plant ID, water, fertilizer, quantity, and favorite are valid
        return res.send({
          error: 'Invalid plant ID, water, fertilizer, quantity, or favorite values provided'
        });
      }
      favorite = favorite === 'true'; // Convert favorite to boolean
      const plant = await UserPlants.find({
        where: {plantID: plantID, userID: req.session.userId},
      });
      if (plant.length > 0) { // Check if plant already exists
        return res.send({
          error: 'Plant is already part of your garden'
        });
      }
      await UserPlants.create({
        userID: req.session.userId,
        plantID: plantID,
        waterFrequency: waterFreq,
        fertilizerFrequency: fertilizerFreq,
        lastWatered: moment().format(),
        lastFertilized: moment().format(),
        quantity: quantity,
        isFavorite: favorite
      });
      return res.send({ // Return success
        success: true
      });
    } catch (error) {
      console.log(error);
    }
  }
};
