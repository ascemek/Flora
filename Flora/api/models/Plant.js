/*
 * @author Sami Cemek
 * @version 1.0
 * @date 04/28/23
 * @title Plant Model
 * @description This model handles all the requests for the plant model.
 * @usage This model holds the scraped plants' information.
 * @frameworks sails.js
*/

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

        // Additonal Scraped Information

        // Genus Names
        genus: {
            type: 'string',
            required: false,
        },
        // plant height
        height: {
            type: 'string',
            required: false,
        },
        // plant width
        width: {
            type: 'string',
            required: false,
        },
        // flower color
        flowerColor: {
            type: 'string',
            required: false,
        },
        // foliage color
        foliageColor: {
            type: 'string',
            required: false,
        },
        // season features
        seasonFeatures: {
            type: 'string',
            required: false,
        },
        // special features
        specialFeatures: {
            type: 'string',
            required: false,
        },
        // propagation
        propagation: {
            type: 'string',
            required: false,
        },
        // problem solvers
        problemSolvers: {
            type: 'string',
            required: false,
        },

      }

};

