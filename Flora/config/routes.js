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
  '/': {view: 'pages/homepage', policy: 'sessionAuth'},
  '/login': { view: 'pages/login' }, // Login page
  '/register': { view: 'pages/register' }, // Register page
  '/user/login': 'UserController.login', // Login action
  '/user/logout': 'UserController.logout', // Logout action
  '/user/register': 'UserController.createAccount', // Register action
  
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

  '/my_garden': {view: 'pages/my_garden', policy: 'sessionAuth'},
  '/journal': {view: 'pages/journal', policy: 'sessionAuth'},
  '/profile': {view: 'pages/profile', policy: 'sessionAuth'},
  '/watering': {view: 'pages/informationPages/watering', policy: 'sessionAuth'},
  '/information': {view: 'pages/informationPages/information', policy: 'sessionAuth'},
  '/plantInfo': {view: 'pages/plantInfo', policy: 'sessionAuth'},
  '/plantSearch': {view: 'pages/plantSearch', policy: 'sessionAuth'}

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
