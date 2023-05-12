/**
 * @author Sami Cemek
 * @version 1.0
 * @date 04/28/23
 * @title Plant Model
 * @description This model handles all the requests for the plant model.
 * @usage This model holds the scraped plants' information.
 * @frameworks sails.js
\

module.exports = {
    attributes: {
        // name of the plant
        name: { 
            type: 'string',
            required: true,
        },
        // sun frequency of the plant
        sunFrequency: {
            type: 'string',
            required: true,
        },
        // water frequency of the plant
        waterFrequency: {
            type: 'string',
            required: true,
        },
        // fertilizer frequency of the plant
        fertilizerFrequency: {
            type: 'string',
            required: true,
        },
        // native region of the plant
        nativeRegion: {
            type: 'string',
            required: false,
        },
        // category of the plant: edible, ornamental, etc.
        category: {
            type: 'string',
            required: false,
        },
        // link to the plant's seed
        seedLink: {
            type: 'string',
            required: false,
            defaultsTo: 'https://www.burpee.com/',
        },
        // link to the plant's image
        images: {
            type: 'string',
            required: false,
            defaultsTo: 'images/defaultPlantIcon.png',
        },
      }

};

