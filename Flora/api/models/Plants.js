/**
 * @author chloe jones
 * Plants.js
 *
 * A table holding plant information.
 */

 module.exports = {
    attributes: {
      id: {  // Unique ID
        type: 'string',
        required: true,
      },
      name: { // Plant name
        type: 'string',
        required: true,
      },
      sun: { // sun information 
        type: 'string',
        required: true,
      },
      water: { // water information
        type: 'string',
        required: true,
      },
      fertilizer: { // fertilizer information
        type: 'string',
        required: true,
      },
      nativeArea: { // native region info
        type: 'string',
        required: false,
      },
      category: { // type of plant it is
        type: 'string',
        required: false,
      },
      where: {  //info on indoor/outdoor
        type: 'string',
        required: false,
      }
      //TODO: add images feild 
      //images ? wasn't sure the type . 
    }
  };