//@author Faye Landers
//Purpose: Create a way to search the database for plants, retrieve plant information, add a plant
module.exports = {
    //create plant?? I think we will use this if we are still letting people add custom plants to database
    createPlant: async function (req, res) {
        try {
          const params = {
            name: req.param('name'), // This is the plant name
            sun: req.param('sun'), //Sunlight info 
            water: req.param('water'), // how often plant is watered
            fertilizer: req.param('fertilizer'), //how often plant is fertilized
            nativeArea: req.param('nativeArea'), //region of plant (if we do it)
            category: req.param('category'), //plant type (herb, vegetable, flower, edible, etc)
            where: req.param('where'), //picture of plant?
    
          };
          const plantRecord = {
            name: params.name,
            sun: params.sun ? params.sun : null,
            water: params.water,
            fertilizer: params.fertilizer ? params.fertilizer : null,
            nativeArea: params.nativeArea ? params.nativeArea : null,
            category: params.category ? true : false,
            where: params.where ? params.where : null,
          };

          await Plants.create(plantRecord); //This is referencing plant table that is not connected to this yet (will add )
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
           return res.view('pages/plantSearch', {
            //eventData:JSON.stringify(events),
            plantData:JSON.stringify(plants)
        });
          } catch (error) {
            console.log(error);
            return res.send({
              error: error
            });
        }
    },

    searchPlant: async function (req, res) { //search for a specific plant
        try {
            var totalPlants = await Plant.find(); 
            var requestedPlant = req;

            const searchResultsArr = [];

            for(i = 0; i < totalPlants.length; i++){
              if(totalPlants[i].name == requestedPlant){
                searchResultsArr.push(totalPlants[i]);

              }
              //check matching characters and sort by how close it is to search
            }; 
            return res.view('pages/plantSearch', {
              //eventData:JSON.stringify(events),
              plantData:JSON.stringify(searchResultsArr)
          });
            
          } catch (error) {
            console.log(error);
            return res.send({
              error: error
            });
        }
    } 
  /*  searchPlants: async function (req, res) { // This is the action to fetch events for a given date range
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
    //new get acutal plants
    getDefaultPlants: async function (userPlants){
      const defaultPlants = await Plants.find();
      console.log(defaultPlants);
      const defaultPlantsArr = [];
      for(i = 0; i < defaultPlants.length; i++){
        defaultPlantsArr.push(defaultPlants[i]);
    
      }
    
      for(i = 0; i < userPlants.length; i++){
        defaultPlantsArr.push(userPlants[i]);
      }
    
      return defaultsPlantsArr;
    }*/
};