/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  //plant search functions
  '/plantSearch': {controller: 'SearchController', action: 'fetchPlants', view: 'pages/plantSearch', policy: 'sessionAuth'},
  '/createPlant': { controller: 'SearchController', action: 'createPlant', view: 'pages/plantSearch', policy: 'sessionAuth' },  //create a plant
  '/fetchPlants': { controller: 'SearchController', action: 'fetchPlants', view: 'pages/plantSearch', policy: 'sessionAuth' }, //get all plants
  '/searchPlants': {controller: 'SearchController', action: 'searchPlant', view: 'pages/plantSearch', policy: 'sessionAuth'},//search for a specific plant

  '/': {view: 'pages/homepage', policy: 'sessionAuth'},
  '/login': { view: 'pages/login' }, // Login page
  '/register': { view: 'pages/register' }, // Register page
  '/user/login': 'UserController.login', // Login action
  '/user/logout': 'UserController.logout', // Logout action
  '/user/register': 'UserController.createAccount', // Register action
  '/user/edit': {controller: 'UserController', action: 'editAccount', policy: 'sessionAuth'}, // Edit account action
  
  //Information pages routes
  '/companion_planting': {view: 'pages/informationPages/companion_planting', policy: 'sessionAuth'},
  '/sunlight': {view: 'pages/informationPages/sunlight', policy: 'sessionAuth'},
  '/fertilizer': {view: 'pages/informationPages/fertilizer', policy: 'sessionAuth'},
  '/diseases_pests_weeds': {view: 'pages/informationPages/diseases_pests_weeds', policy: 'sessionAuth'},
  '/agr_zones': {view: 'pages/informationPages/agr_zones', policy: 'sessionAuth'},
  '/composting': {view: 'pages/informationPages/composting', policy: 'sessionAuth'},

  //Forum routes
  '/forum': {view: 'pages/forum', policy: 'sessionAuth', controller: 'PostsController', action: 'fetchPosts'},
  '/new_post': {view: 'pages/new_post'},
  '/post/create': {controller: 'PostsController', action: 'createPost', policy: 'sessionAuth'},
  '/post/fetch': {controller: 'PostsController', action: 'fetchPosts', policy: 'sessionAuth'},
  '/reply/create': {controller: 'PostsController', action: 'createReply', policy: 'sessionAuth'},

  //Garden routes
  '/updateTask': {controller: 'GardenController', action: 'updateTask', policy: 'sessionAuth'},
  '/removePlant': {controller: 'GardenController', action: 'removePlant', policy: 'sessionAuth'},
  '/favoritePlant': {controller: 'GardenController', action: 'favoritePlant', policy: 'sessionAuth'},
  '/my_garden': {view: 'pages/my_garden', controller: 'GardenController', action: 'viewGarden', policy: 'sessionAuth'},
  '/journal': {view: 'pages/journal', policy: 'sessionAuth'},
  '/profile': {view: 'pages/profile', policy: 'sessionAuth', controller: 'UserController', action: 'getAccount'}, // Profile page
  '/watering': {view: 'pages/informationPages/watering', policy: 'sessionAuth'},
  '/information': {view: 'pages/informationPages/information', policy: 'sessionAuth'},
  '/new_plant/:plantID': {view: 'pages/new_plant', controller: 'PlantController', action: 'viewPlantAdd', policy: 'sessionAuth'},
  '/userAddPlant': {controller: 'PlantController', action: 'addPlant', policy: 'sessionAuth'},
  '/plantInfo/:plantID': {view: 'pages/plantInfo', controller: 'PlantController', action: 'viewPlantInfo', policy: 'sessionAuth'},
  //'/plantInfo': {view: 'pages/plantInfo', controller: 'PlantController', action: 'viewPlantInfo', policy: 'sessionAuth'},
  '/getCurrentXP': {policy: 'sessionAuth', controller: 'UserController', action: 'getCurrentXP'}, // Profile page

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.

};
