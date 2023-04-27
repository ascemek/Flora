// api/helpers/passwords/comparePasswords.js
/**
 * comparePasswords.js
 *
 * A helper to compare passwords.
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean} Whether the passwords match.
 * @example const passwordsMatch = await sails.helpers.passwords.comparePasswords('password', 'hashedPassword');
 * @see https://sailsjs.com/documentation/concepts/helpers
  */

module.exports = {
  friendlyName: 'Compare passwords',
  description: 'Compare two passwords.',
  inputs: {
    password: {
      type: 'string',
      example: 'password',
      description: 'The password to compare.',
      required: true
    },
    hashedPassword: {
      type: 'string',
      example: 'hashedPassword',
      description: 'The hashed password to compare.',
      required: true
    }
  },
  fn: async function(inputs, exits) {
    const bcrypt = require('bcrypt'); // Require bcrypt
    const passwordsMatch = await bcrypt.compare(inputs.password, inputs.hashedPassword); // Compare passwords
    return exits.success(passwordsMatch); // Return whether passwords match
  }
};