/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 * @author Nicolas Pitcher
 * @author Sami Cemek
 * @author Faye Landers
 * @author Chloe Jones
 */

const scheduler = require('node-schedule');
const moment = require('moment');
//const Plant = require('../api/models/Plant');

module.exports.bootstrap = async function(done) {
  //Start the cron task for creating user plant tasks
  scheduler.scheduleJob('* * * * *', async () => { //Run every 15 minutes */15 * * * *
    await sails.helpers.schedulePlantTasks();
  });
  // Set up administrators when there is no users and devMode is true
  if ((await Users.count()) === 0 && sails.config.custom.devMode) {
    await Users.createEach([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@admin.com',
        experience: 'Expert',
        username: 'admin',
        password: await sails.helpers.passwords.hashPassword('admin'), // Hash password
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        experience: 'Expert',
        username: 'johndoe1',
        password: await sails.helpers.passwords.hashPassword('john'), // Hash password
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        experience: 'Expert',
        username: 'janedoe1',
        password: await sails.helpers.passwords.hashPassword('jane'), // Hash password
      },
      {
        firstName: 'Student',
        lastName: 'Tester',
        email: 'student@test.com',
        experience: 'Expert',
        username: 'studenttest1',
        password: await sails.helpers.passwords.hashPassword('test'), // Hash password
      },
      {
        firstName: 'Abigail',
        lastName: 'Star',
        email: 'abby@valley.com',
        experience: 'Expert',
        username: 'abbyvalley1',
        password: await sails.helpers.passwords.hashPassword('abby'), // Hash password
      },
      {
        firstName: 'Gunther',
        lastName: 'Hansen',
        email: 'gunther@valley.com',
        experience: 'Expert',
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
        quantity: 2,
        isFavorite: true,
      }
    ]);
  }
  // if (await Plants.count() === 0){ /*.count function not working???*/
  //   await Plant.createEach( [
  //     {
  //      // id: 'basil',
  //       name: 'Basil',
  //       sunFrequency: 'Basil thrives in warm temperatures and full morning sun. If you live in an area with scorching midday sun, try to give your basil light shade during the hottest time of day.',
  //       waterFrequency: 'Basil likes to stay moist and requires approximately 1 inch of water every week. Water deeply at least once a week to keep roots growing deep and the soil moist. Basil growing in containers will need more frequent watering. Your goal when growing basil in a container is to keep the soil from drying out. The best time of day to water basil is early in the morning.',
  //       fertilizerFrequency: "Basil is a vigorous grower requiring very little to no fertilization. In fact, too much fertilization will kill the basil's flavor. If you choose to add fertilizer, a light application of a liquid fertilizer twice a season is all you really need for basil growing outdoors. If you're planning to grow basil in a pot and want to add fertilizer, your plants will require only a very weak liquid solution every 3 to 4 weeks to compensate for nutrients washed away by frequent watering.",
  //       nativeRegion: 'North America',
  //       category: 'Herb',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //      // id: 'rosemary',
  //       name: 'Rosemary',
  //       sunFrequency: 'Rosemary needs at least six hours of sun daily.',
  //       waterFrequency: 'The plant is originally from the Mediterranean, so it prefers dry conditions and suffers when watered too frequently.',
  //       fertilizerFrequency: "Rosemary doesn't often need fertilizer, but if the plant looks small or growth seems slow, fertilize with a balanced, all-purpose fertilizer in the spring before new growth appears. ",
  //       nativeArea: "Rosemary is originally from the Mediterranean.",
  //       category: 'Herb',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //      // id: 'bellPepper',
  //       name: 'Bell Pepper',
  //       sunFrequency: 'Peppers need full, direct sun at least six to eight hours each day.',
  //       waterFrequency: 'Keep bell peppers well-watered, but never leave soil soggy. Water to moisten soil about 6 inches deep, then let it dry slightly. Watering is especially important during fruit set, when tiny peppers take the place of blossoms, and as the bells mature. Consistent moisture helps keep peppers firm and healthy.',
  //       fertilizerFrequency: "Peppers generally need added nutrition. Phosphorus and calcium are keys to bountiful bell pepper growth. avoid high-nitrogen fertilizers, which stimulate leafy growth instead of fueling sweet fruits. Products designed for tomatoes and vegetables provide higher relative amounts of phosphorus and potassium in the nutrient balance peppers prefer.",
  //       category: 'Vegtable',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //      // id: 'cantaloupe',
  //       name: 'Cantaloupe',
  //       sunFrequency: 'Cantaloupes need full sun for 6 to 8 hours a day. ',
  //       waterFrequency: 'Water cantaloupe deeply and infrequently, 1-2 inches per week. Use drip irrigation if possible. Mulch around the plants will help conserve soil moisture and reduce weed growth. Irrigate so that moisture goes deeply into the soil.',
  //       fertilizerFrequency: "A well-rounded fertilizer will do the trick for cantaloupe. Consider light but frequent applications of nitrogen fertilizer every 3 to 4 weeks.",
  //       category: 'Vegtable',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //      // id: 'tomato',
  //       name: 'Tomato',
  //       sunFrequency: 'Tomatoes need at least 8 hours of sunlight daily. ',
  //       waterFrequency: 'Water with about one to two inches of water per week, with heavy soakings once a week being preferred to several lighter sprinklings with the hose.',
  //       fertilizerFrequency: "Fertilize with a 6-8-8 or similar type of fertilizer will help your plants succeed. You can use either a liquid fertilizer solution or a granular fertilizer, preferably in controlled-release form. You should fertilize at planting time and then regularly throughout the growing season.",
  //       category: 'Vegtable',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //     //  id: 'strawberry',
  //       name: 'Strawberry',
  //       sunFrequency: 'Ten or more hours of sunlight each day is ideal, but they need a minimum of six hours of direct sunlight each day.',
  //       waterFrequency: 'During normal weather conditions, strawberries need water equal to 1 to 1.5 inches of rain each week. During hot, dry periods, water as needed to prevent shallow roots from drying out. Plants in containers may need daily watering. Always water early in the day so that foliage dries well before nightfall.',
  //       fertilizerFrequency: "Established strawberries should be fertilized once per year after the final harvest. Spring fertilization is not recommended because it can result in soft berries and overly vigorous growth that can increase the incidence of disease. Spread 8 ounces (one cup) 10-10-10 or 12-12-12 evenly over a 20-foot row. If a soil test indicates a need for phosphorus or potassium, these nutrients may be applied in the spring without causing berry softening. Sometimes small amounts of nitrogen fertilizer may be beneficial for strawberries in the spring. If the plants are not growing vigorously, are light green or the plants are growing on sandy soils and there has been higher than normal rainfall, an application of nitrogen at the very low rate of 1.6 ounces (3 T) per 20-foot row should be helpful.",
  //       category: 'Vegtable',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //     //  id: 'pothos',
  //       name: 'Pothos',
  //       sunFrequency: 'Pothos need full sun/ partial shade. They like bright indirect light, but can survive in low light.',
  //       waterFrequency: 'Water deeply when soil is dry. Let soil completely dry out before watering again.',
  //       fertilizerFrequency: "No fertilizer needed.",
  //       category: 'Indoor',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //     //  id: 'snake',
  //       name: 'Snake Plant',
  //       sunFrequency: 'While snake plants prefer bright indirect sunlight, they can survive in low light.',
  //       waterFrequency: 'Water fortnightly or when top 2 inches of soil feel dry. ',
  //       fertilizerFrequency: "Give liquid fertilizer once a month in spring and summer. ",
  //       category: 'Indoor',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //   ])
  //}

  // import the plantInfoScraped.json file
  var plantInfo = await require('../api/webScraping/plantInfoScraped.json');
  const plants = [];

  // loop through the scraped plant information and add it to the database
  for (let i = 0; i < plantInfo.length; i++) {
    // create a plant with the following information
    const newPlant = await Plant.create({ 
      genus : plantInfo[i]["Genus Names"],
      name: plantInfo[i]["name"],
      category: plantInfo[i]["category"],
      sunFrequency: plantInfo[i]["sunFrequency"],
      waterFrequency: " ", //plantInfo[i]["WATER"],      // NOT SCRAPED
      fertilizerFrequency: " ", //plantInfo[i]["FERTILIZER"], // NOT SCRAPED
      height: plantInfo[i]["Height"],
      width: plantInfo[i]["Width"],
      flowerColor: plantInfo[i]["Flower Color"],
      foliageColor: plantInfo[i]["Foliage Color"],
      seasonFeatures: plantInfo[i]["Season Features"],
      specialFeatures: plantInfo[i]["Special Features"],
      nativeRegion: plantInfo[i]["nativeRegion"],
      propagation: plantInfo[i]["Propagation"],
      problemSolvers: plantInfo[i]["Problem Solvers"],
      seedLink: "https://www.burpee.com/",
      images: plantInfo[i]["image"] ? plantInfo[i]["image"] : 'images/defaultPlantIcon.png',
    }).fetch();
    plants.push(newPlant);
}
  return done();
};
