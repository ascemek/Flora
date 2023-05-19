//Nicolas Pitcher
const uuidv4 = require('uuid/v4'); // Import uuid

module.exports = {
  /*
    Login a user.
    @param {string} username
    @param {string} password
    @returns {object} success
  */
  login: async function(req, res) {
    try {
      const username = req.param('username');
      const password = req.param('password');
      if (!username || !password) { // Check if username and password are provided
        return res.send({
          error: 'Username and password required'
        });
      }
      let user = await Users.find({username: username}); // Find user
      if (!user || user.length === 0) { // Check if user exists
        return res.send({ // Return error if user doesn't exist
          error: 'User not found'
        });
      }
      user = user[0];
      const validPassword = await sails.helpers.passwords.comparePasswords(password, user.password); // Check if password is valid
      if (!validPassword) { // Return error if password is invalid
        return res.send({
          error: 'Invalid password'
        });
      }
      req.session.sessionID = uuidv4(); // Generate session ID
      req.session.userId = user.id; // Set user ID
      return res.send({ // Return success
        success: true
      });
    } catch (err) { // Return error if something goes wrong
      return res.send({
        error: 'Error logging in'
      });
    }
  },
  /*
    Logout a user.
    @returns {object} success
  */
  logout:function(req, res) {
    req.session.userId = undefined; // Clear session
    return res.send({ // Return success
      success: true
    });
  },
  /*
    Create a new user.
    @param {string} firstName
    @param {string} lastName
    @param {string} email
    @param {string} username
    @param {string} password
    @returns {object} success
  */
  createAccount: async function(req, res) {
    try {
      const firstName = req.param('firstName');
      const lastName = req.param('lastName');
      const email = req.param('email');
      const experience = req.param('experience');
      const username = req.param('username');
      const password = req.param('password');
      if (!firstName || !lastName || !email || !username || !password) { // Missing required params
        return res.send({
          error: 'All fields required'
        });
      }
      if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') { // Empty params
        return res.send({
          error: 'All fields required'
        });
      }
      const existingUser = await Users.find({ // Check if user already exists
        or: [{email: email}, {username: username}]
      });
      if (existingUser && existingUser.length > 0) { // Return error if user already exists
        return res.send({
          error: 'User already exists'
        });
      }
      const hash = await sails.helpers.passwords.hashPassword(password); // Hash password
      await Users.create({ // Create user
        firstName: firstName,
        lastName: lastName,
        email: email,
        experience: experience,
        username: username,
        password: hash,
      }).exec((err, user) => { // Error handling
        if (err) {
          return res.send({
            error: 'Error creating user'
          });
        }
      });
      return res.send({ // Return success
        success: true
      });
    } catch (err) { // Error creating user
      return res.send({
        error: 'Error creating user'
      });
    }
  },
  /*
    Get a user's account information.
    @param {string} accountId
    @returns {object} account
  */
  getAccount: async function(req, res) {
    try {
      const userId = req.session.userId;
      let accountId = req.param('accountId');
      if (!userId) { // User not logged in
        return res.view('pages/login', {
          error: 'Missing required params'
        });
      }
      if (!accountId) { // Get own account
        accountId = userId;
      }
      let isSelfEdit = userId === parseInt(accountId);
      const foundUser = await Users.find({id: accountId})
      if (!foundUser || foundUser.length === 0) { // User not found
        return res.view('pages/homepage', {
          error: 'User not found'
        });
      }
      const user = foundUser[0];
      const account = { // Return account info
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        experience: user.experience,
        username: user.username,
        isSelfEdit: isSelfEdit
      };
      return res.view('pages/profile', {
        account: JSON.stringify(account)
      });
    } catch (err) { // Error getting account
      return res.send({
        error: 'Error getting account'
      });
    }
  },
  /*
    Edit a user's account information.
    @param {string} firstName
    @param {string} lastName
    @param {string} email
    @param {string} interests
    @returns {object} success
  */
  editAccount: async function(req, res) {
    try {
      const firstName = req.param('firstName');
      const lastName = req.param('lastName');
      const email = req.param('email');
      const experience = req.param('experience');
      //const interests = req.param('interests');
      const userId = req.session.userId;
      if (!userId) { //Redirect to login page if not logged in
        return res.view('pages/login', {
          error: 'Missing required params'
        });
      }
      if (!firstName || !lastName || !email ){ //!interests) { //Check for missing params
        return res.send({
          error: 'All fields required'
        });
      }
      if (firstName === '' || lastName === '' || email === '' ){ //|| interests === '') { //Check for empty params
        return res.send({
          error: 'All fields required'
        });
      }
      let existingUser = await Users.find({ //Check if user exists
        id: userId
      });
      if (!existingUser || existingUser.length === 0) { //Return error if user doesn't exist
        return res.send({
          error: 'User not found'
        });
      }
      existingUser = existingUser[0];
      await Users.update({id: userId}, { //Update user
        firstName: firstName,
        lastName: lastName,
        email: email,
        experience: experience,
        //interests: interests
      }).exec((err, user) => { //Return error if update fails
        if (err) {
          return res.send({
            error: 'Error updating user'
          });
        }
      }
      );
      return res.send({ //Return success if update succeeds
        success: true
      });
    } catch (err) { //Return error if error occurs
      return res.send({
        error: 'Error updating user'
      });
    }
  },

  getCurrentXP: async function(req, res) {
    try{
      const user =  await Users.find({id: req.session.userID}); 
      const experience = user[0].experience;
      return res.send({
        experience
      })
    }
    catch (err) { //Return error if error occurs
      return res.send({
        error: 'Error updating user'
      });
    }
  },
};
