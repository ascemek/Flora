// api/helpers/passwords/hashPassword.js
/**
 * hashPassword.js
 *
 * A helper to hash a password.
 * @author Nicolas Pitcher
 * @param {string} password
 * @returns {string} The hashed password.
 * @example const hashedPassword = await sails.helpers.passwords.hashPassword('password');
 * @see https://sailsjs.com/documentation/concepts/helpers
  */

module.exports = {
  friendlyName: 'Hash password',
  description: 'Hash a password.',
  inputs: {
    password: {
      type: 'string',
      example: 'password',
      description: 'The password to hash.',
      required: true
    }
  },
  fn: async function(inputs, exits) {
    const bcrypt = require('bcrypt'); // Require bcrypt
    const saltRounds = 10; // Salt rounds
    const salt = await bcrypt.genSalt(saltRounds); // Generate salt
    const hash = await bcrypt.hash(inputs.password, salt); // Hash password
    return exits.success(hash); // Return hashed password
  }
};
