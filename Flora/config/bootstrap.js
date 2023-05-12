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

module.exports.bootstrap = async function(done) {
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
  return done();
};

// setting up baseline data for the plants table
module.exports.bootstrap = async function(done) {

  const Plants = [];

  // loop through the scraped plant information and add it to the database
  for (scraped of plantInfo) { // for each plant in the plantInfo array
    await Plants.createEach([ // create a plant with the following information
      {
        name: scraped["COMMON NAME"],
        sunFrequency: scraped["LIGHT"],
        waterFrequency: scraped["WATER"],
        fertilizerFrequency: scraped["FERTILIZER"],
        nativeRegion: scraped["NATIVE REGION"],
        category: scraped["CATEGORY"],
        seedLink: scraped["SEED LINK"],
        images: scraped["IMAGES"],
      }
    ]);
    
  // MANUALLY ADDING PLANTS TO THE DATABASE
  // if ((await Plant.count()) === 0 && sails.config.custom.devMode) {
  //   await Plant.createEach([
  //     {
  //       name: 'Allium',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Tulipa',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Tulbaghia',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Anemone',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Gloriosa superba',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Monarda',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Alcea rosea',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     },
  //     {
  //       name: 'Geranium sp.',
  //       sunFrequency: 'Full Sun',
  //       waterFrequency: 'Once a week',
  //       fertilizerFrequency: 'Once a month',
  //       nativeRegion: 'Northern Hemisphere',
  //       category: 'Edible',
  //       seedLink: 'https://www.burpee.com/',
  //       images: 'images/defaultPlantIcon.png',
  //     }
  //   ]);
  }
};

// scraped plant information from the plantInfoScraped.json file
const plantInfo =
[
  {
      "GENUS NAMES": "Allium",
      "COMMON NAME": "Allium",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "6 to 12 inches",
      "FLOWER COLOR": "Blue, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Good for Containers, Low Maintenance",
      "ZONES": "4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant"
  },
  {
      "GENUS NAMES": "Tulipa",
      "COMMON NAME": "Triumph Tulip",
      "PLANT TYPE": "Bulb",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "null to 6 inches",
      "FLOWER COLOR": "Blue, Green, Orange, Pink, Red, White",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold",
      "SEASON FEATURES": "Spring Bloom",
      "SPECIAL FEATURES": "Cut Flowers, Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "3, 4, 5, 6, 7, 8",
      "PROPAGATION": "Division",
      "PROBLEM SOLVERS": "Drought Tolerant"
  },
  {
      "GENUS NAMES": "Tulbaghia",
      "COMMON NAME": "Society Garlic",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "1 to 2 feet",
      "FLOWER COLOR": "Pink",
      "FOLIAGE COLOR": "Blue/Green, Gray/Silver",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Fragrance, Low Maintenance",
      "ZONES": "10, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant"
  },
  {
      "GENUS NAMES": "Anemone",
      "COMMON NAME": "Anemone Bulbs",
      "PLANT TYPE": "Bulb",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "4 to 10 inches",
      "FLOWER COLOR": "Blue, Orange, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom",
      "SPECIAL FEATURES": "Cut Flowers, Good for Containers, Low Maintenance",
      "ZONES": "5, 6, 7, 8",
      "PROPAGATION": "Division",
      "PROBLEM SOLVERS": "Drought Tolerant, Good For Privacy, Groundcover, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Gloriosa superba",
      "COMMON NAME": "Gloriosa Lily",
      "PLANT TYPE": "Bulb, Vine",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "6 to 6 inches",
      "WIDTH": "null to 1 foot",
      "FLOWER COLOR": "Red",
      "FOLIAGE COLOR": "Chartreuse/Gold",
      "SEASON FEATURES": "Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Good for Containers",
      "ZONES": "10, 11",
      "PROPAGATION": "Division",
      "PROBLEM SOLVERS": "Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Monarda",
      "COMMON NAME": "Bee Balm",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "1 to 4 feet",
      "WIDTH": "1 to 4 feet",
      "FLOWER COLOR": "Pink, Purple, Red, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Fragrance, Low Maintenance",
      "ZONES": "3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant"
  },
  {
      "GENUS NAMES": "Alcea rosea",
      "COMMON NAME": "Hollyhock",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "3 to 8 feet",
      "WIDTH": "1 to 3 feet",
      "FLOWER COLOR": "Blue, Orange, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Low Maintenance",
      "ZONES": "10, 2, 3, 4, 5, 6, 7, 8",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Good For Privacy"
  },
  {
      "GENUS NAMES": "Geranium sp.",
      "COMMON NAME": "Perennial Geranium",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Part Sun, Shade, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "6 to 48 inches",
      "FLOWER COLOR": "Blue, Pink, Purple, White",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold",
      "SEASON FEATURES": "Colorful Fall Foliage, Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Low Maintenance",
      "ZONES": "3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Groundcover, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Euphorbia",
      "COMMON NAME": "Spurge",
      "PLANT TYPE": "Annual, Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "1 to 3 feet",
      "FLOWER COLOR": "Green, Orange, Pink, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold, Purple/Burgundy",
      "SEASON FEATURES": "Colorful Fall Foliage, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Good for Containers, Low Maintenance",
      "ZONES": "10, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Groundcover, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Oxalis",
      "COMMON NAME": "Oxalis",
      "PLANT TYPE": "Annual, Bulb, Houseplant, Perennial",
      "LIGHT": "Part Sun, Shade, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "6 to 12 inches",
      "FLOWER COLOR": "Orange, Pink, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold, Gray/Silver, Purple/Burgundy",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom, Winter Bloom",
      "SPECIAL FEATURES": "Good for Containers, Low Maintenance",
      "ZONES": "10, 11, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Drought Tolerant, Groundcover"
  },
  {
      "GENUS NAMES": "Nerium",
      "COMMON NAME": "Oleander",
      "PLANT TYPE": "Shrub",
      "LIGHT": "Sun",
      "HEIGHT": "3 to 25 feet",
      "WIDTH": "3 to 12 feet",
      "FLOWER COLOR": "Pink, Red, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Summer Bloom",
      "SPECIAL FEATURES": "Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "10, 11, 9",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Good For Privacy, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Erysimum",
      "COMMON NAME": "Wallflower",
      "PLANT TYPE": "Annual, Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "1 to 2 feet",
      "FLOWER COLOR": "Blue, Orange, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "10, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Seed, Stem Cuttings"
  },
  {
      "GENUS NAMES": "Ligustrum",
      "COMMON NAME": "Privet",
      "PLANT TYPE": "Shrub",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "8 to 20 feet",
      "WIDTH": "6 to 8 feet",
      "FLOWER COLOR": "White",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold",
      "SEASON FEATURES": "Summer Bloom, Winter Interest",
      "SPECIAL FEATURES": "Attracts Birds, Fragrance, Low Maintenance",
      "ZONES": "5, 6, 7, 8, 9",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Drought Tolerant, Good For Privacy"
  },
  {
      "GENUS NAMES": "Salvia officinalis",
      "COMMON NAME": "Sage",
      "PLANT TYPE": "Herb, Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "2 to 3 feet",
      "FLOWER COLOR": "Blue, Pink, Purple, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Summer Bloom",
      "SPECIAL FEATURES": "Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "10, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant"
  },
  {
      "GENUS NAMES": "Hylotelephium (formerly Sedum)",
      "COMMON NAME": "Sedum",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "2 to 36 inches",
      "WIDTH": "14 to 48 inches",
      "FLOWER COLOR": "Orange, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green, Chartreuse/Gold, Gray/Silver, Purple/Burgundy",
      "SEASON FEATURES": "Colorful Fall Foliage, Fall Bloom, Summer Bloom, Winter Interest",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Good for Containers, Low Maintenance",
      "ZONES": "10, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Groundcover"
  },
  {
      "GENUS NAMES": "Armeria",
      "COMMON NAME": "Thrift",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "6 to 12 inches",
      "FLOWER COLOR": "Pink, Red, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Cut Flowers, Good for Containers, Low Maintenance",
      "ZONES": "3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Groundcover"
  },
  {
      "GENUS NAMES": "Campsis",
      "COMMON NAME": "Trumpet Vine",
      "PLANT TYPE": "Vine",
      "LIGHT": "Sun",
      "HEIGHT": "20 to 40 feet",
      "WIDTH": "5 to 20 feet",
      "FLOWER COLOR": "Orange, Red, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds",
      "ZONES": "5, 6, 7, 8, 9",
      "PROPAGATION": "Layering, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Drought Tolerant, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Viola",
      "COMMON NAME": "Violet",
      "PLANT TYPE": "Annual, Perennial",
      "LIGHT": "Part Sun, Shade, Sun",
      "HEIGHT": "2 to 12 inches",
      "WIDTH": "4 to 10 inches",
      "FLOWER COLOR": "Blue, Orange, Pink, Purple, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Winter Bloom",
      "SPECIAL FEATURES": "Cut Flowers, Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "10, 11, 2, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Groundcover"
  },
  {
      "GENUS NAMES": "Yucca",
      "COMMON NAME": "Yucca",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "3 to 15 feet",
      "FLOWER COLOR": "Pink, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Colorful Fall Foliage, Fall Bloom, Summer Bloom, Winter Interest",
      "SPECIAL FEATURES": "Attracts Birds, Fragrance, Good for Containers, Low Maintenance",
      "ZONES": "10, 11, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant"
  },
  {
      "GENUS NAMES": "Tecoma stans",
      "COMMON NAME": "Yellow Bells",
      "PLANT TYPE": "Shrub",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "1 to 3 feet",
      "WIDTH": "3 to 4 feet",
      "FLOWER COLOR": "Orange, Red, Yellow",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Good for Containers",
      "ZONES": "10, 11",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Drought Tolerant, Good For Privacy"
  },
  {
      "GENUS NAMES": "Achillea",
      "COMMON NAME": "Yarrow",
      "PLANT TYPE": "Herb, Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "6 to 24 inches",
      "WIDTH": "2 to 3 feet",
      "FLOWER COLOR": "Orange, Pink, Red, White, Yellow",
      "FOLIAGE COLOR": "Blue/Green, Gray/Silver",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom, Winter Interest",
      "SPECIAL FEATURES": "Attracts Birds, Good for Containers, Low Maintenance",
      "ZONES": "10, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Groundcover, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Veronica",
      "COMMON NAME": "Veronica",
      "PLANT TYPE": "Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "6 to 36 inches",
      "WIDTH": "8 to 24 inches",
      "FLOWER COLOR": "Blue, Pink, Purple, White",
      "FOLIAGE COLOR": "Blue/Green, Gray/Silver",
      "SEASON FEATURES": "Fall Bloom, Spring Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Good for Containers, Low Maintenance",
      "ZONES": "10, 11, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Division, Seed",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Groundcover"
  },
  {
      "GENUS NAMES": "Viburnum",
      "COMMON NAME": "Viburnum",
      "PLANT TYPE": "Shrub",
      "LIGHT": "Part Sun, Sun",
      "HEIGHT": "3 to 8 feet",
      "WIDTH": "3 to 12 feet",
      "FLOWER COLOR": "Pink, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Colorful Fall Foliage, Spring Bloom, Winter Interest",
      "SPECIAL FEATURES": "Attracts Birds, Cut Flowers, Fragrance, Low Maintenance",
      "ZONES": "2, 3, 4, 5, 6, 7, 8, 9",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant, Drought Tolerant, Good For Privacy, Slope/Erosion Control"
  },
  {
      "GENUS NAMES": "Verbena",
      "COMMON NAME": "Verbena",
      "PLANT TYPE": "Annual, Perennial",
      "LIGHT": "Sun",
      "HEIGHT": "6 to 12 inches",
      "WIDTH": "12 to 20 inches",
      "FLOWER COLOR": "Blue, Pink, Purple, Red, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Good for Containers",
      "ZONES": "7, 8, 9",
      "PROPAGATION": "Seed, Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant"
  },
  {
      "GENUS NAMES": "Mandevilla",
      "COMMON NAME": "Mandevilla",
      "PLANT TYPE": "Annual, Perennial, Vine",
      "LIGHT": "Sun",
      "HEIGHT": "3 to 8 feet",
      "WIDTH": "null to 20 feet",
      "FLOWER COLOR": "Pink, Red, White",
      "FOLIAGE COLOR": "Blue/Green",
      "SEASON FEATURES": "Fall Bloom, Summer Bloom",
      "SPECIAL FEATURES": "Good for Containers, Low Maintenance",
      "ZONES": "10, 11",
      "PROPAGATION": "Stem Cuttings",
      "PROBLEM SOLVERS": "Deer Resistant"
  }
]
