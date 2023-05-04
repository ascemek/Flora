/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const scheduler = require('node-schedule');
const moment = require('moment');

module.exports.bootstrap = async function(done) {
  //Start the cron task for creating user plant tasks
  scheduler.scheduleJob('*/15 * * * *', async () => { //Run every 15 minutes
    await sails.helpers.schedulePlantTasks();
  });
  // Set up administrators when there is no users and devMode is true
  if ((await Users.count()) === 0 && sails.config.custom.devMode) {
    await Users.createEach([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@admin.com',
        username: 'admin',
        password: await sails.helpers.passwords.hashPassword('admin'), // Hash password
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        username: 'johndoe1',
        password: await sails.helpers.passwords.hashPassword('john'), // Hash password
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        username: 'janedoe1',
        password: await sails.helpers.passwords.hashPassword('jane'), // Hash password
      },
      {
        firstName: 'Student',
        lastName: 'Tester',
        email: 'student@test.com',
        username: 'studenttest1',
        password: await sails.helpers.passwords.hashPassword('test'), // Hash password
      },
      {
        firstName: 'Abigail',
        lastName: 'Star',
        email: 'abby@valley.com',
        username: 'abbyvalley1',
        password: await sails.helpers.passwords.hashPassword('abby'), // Hash password
      },
      {
        firstName: 'Gunther',
        lastName: 'Hansen',
        email: 'gunther@valley.com',
        username: 'gunthervalley1',
        password: await sails.helpers.passwords.hashPassword('gunther'), // Hash password
      }
    ]);
  }
  if (await UserPlants.count() === 0 && sails.config.custom.devMode) {
    const adminUser = await Users.findOne({username: 'admin'});
    const newPlant = await Plant.create({
      name: 'Admin Plant',
      sunFrequency: 'Full Sun',
      waterFrequency: 'Once a week',
      fertilizerFrequency: 'Once a month',
      nativeRegion: 'North America',
      category: 'Ornamental',
      seedLink: 'https://www.burpee.com/',
      images: 'images/defaultPlantIcon.png',
    }).fetch();
    await UserPlants.createEach([
      {
        userID: adminUser.id,
        plantID: newPlant.id,
        waterFrequency: 3,
        fertilizerFrequency: 7,
        lastWatered: moment('04-01-2023').format(),
        lastFertilized: moment('04-01-2023').format(),
        quantity: 2
      }
    ]);
  }
  return done();
};
