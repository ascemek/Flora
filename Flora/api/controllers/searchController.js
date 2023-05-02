//@author Faye Landers
//Purpose: Create a way to search the database for plants, retrieve plant information, add a plant
module.exports = {
    //create plant?? I think we will use this if we are still letting people add custom plants to database
    createPlant: async function (req, res) {
        try {
          const params = {
            name: req.param('name'), // This is the plant name
            sun: req.param('sun'), //Sunlight info 
            waterFrequency: req.param('waterFrequency'), // how often plant is watered
            fertilizer: req.param('fertilizer'), //how often plant is fertilized
            region: req.param('region'), //region of plant (if we do it)
            category: req.param('category'), //plant type (herb, vegetable, flower, edible, etc)
            images: req.param('images'), //picture of plant?
    
          };
          const plantRecord = {
            name: params.name,
            sun: params.sun ? params.sun : null,
            waterFrequency: params.waterFrequency,
            fertilizer: params.fertilizer ? params.fertilizer : null,
            region: params.region ? params.region : null,
            category: params.category ? true : false,
            images: params.images ? params.images : null,
          };

          await Plant.create(plantRecord); //This is referencing plant table that is not connected to this yet (will add )
          return res.redirect('/plantSearch');
        } catch (error) {
          console.log(error);
          return res.send({
            error: error
          });
        }
      },

    fetchPlants: async function (req, res) { //get all plants
        try {
            const plants = await Plant.find(); //referencing unmade plant table (//update made but not connected)
            return res.send({
              plants
            });
          } catch (error) {
            console.log(error);
            return res.send({
              error: error
            });
        }
    },

  /*  searchPlant: async function (req, res) { //search for a specific plant
        try {
            const requestedPlant = await //get input from search bar...
            //compare info from search bar to each plant in db
            //dont forget to adjust user input if needed
            //maybe account for spelling errors
          } catch (error) {
            console.log(error);
            return res.send({
              error: error
            });
        }
    } */
    searchPlants: async function (req, res) { // This is the action to fetch events for a given date range
      try {
        
        const plants = await Plant.find();
       // const searchResult = [];
       // const data = name.toLowerCase();
        const params = {
          plantName: req.param('plantName'), 

        };
        
       
        return res.view('pages/plantSearch', {
    
          plantData:JSON.stringify(plants)
        }
        );
 

      } catch (error) {
        console.log(error);
        return res.send({
          error: error
        });
      }
    },
};